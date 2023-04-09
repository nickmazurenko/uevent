import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/payments/paypal";
import paypal from "@paypal/checkout-server-sdk";
import prisma from "prisma/prisma";
import { PaymentsService } from "@/lib/payments";
import { getSession } from "next-auth/react";
import { getUserByEmail } from "@/lib/users";
import EventService from "@/lib/events/EventService";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });
    if (!session || !session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    //Capture order to complete payment
    const { orderID } = req.body;

    const payment = await PaymentsService.getPaymentByOrderID(orderID);

    if (!payment || !payment.orderID) {
        return res.status(400).end("Order is expired");
    }

    const PaypalClient = client();
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    // @ts-ignore
    request.requestBody({});
    const response = await PaypalClient.execute(request);
    if (!response) {
        return res.status(500);
    }

    // Update payment to PAID status once completed
    await PaymentsService.setPaidToPayment(payment.orderID);

    const user = await getUserByEmail(session.user?.email || "");

    if (user) {
        const event = await prisma.event.findFirst({
            where: { id: payment.eventId },
        });

        if (event)
            await EventService.buyTickets(event, user.id, payment.ticketsCount);

        // TODO: add one more status for payment (tickets created)
    }

    res.json({ ...response.result });
}
