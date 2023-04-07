import prisma from "prisma/prisma";
import type { NextApiResponse, NextApiRequest } from "next";
import client, { calcValueWithPaypalFee } from "@/lib/payments/paypal";
import paypal from "@paypal/checkout-server-sdk";
import { PaymentsService } from "@/lib/payments";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const PaypalClient = client();

    const { eventId } = req.body as { eventId: string };

    const event = await prisma.event.findFirst({
        where: {
            id: eventId,
        },
    });

    if (!event) {
        return res.status(404).end("Event not found");
    }

    const isEventHasTickets = await PaymentsService.isEventHasTickets(event);
    if (!isEventHasTickets) {
        return res.status(400).end("All tickets are sold out");
    }

    const payment = await PaymentsService.createPayment(event.id);

    let eventCost = event.cost.amount;

    if (event.cost.currency !== "USD") {
        // translate to USD
    }

    const value = calcValueWithPaypalFee(eventCost);

    const request = new paypal.orders.OrdersCreateRequest();
    request.headers["Prefer"] = "return=representation";
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: String(value),
                },
            },
        ],
    });

    const response = await PaypalClient.execute(request);
    if (response.statusCode !== 201) {
        res.status(500);
    }

    await PaymentsService.setOrderId(payment.id, response.result.id);

    res.json({ orderID: response.result.id });
}
