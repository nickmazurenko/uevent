import { Event } from "@prisma/client";

export default class PaymentsService {
    static async getPendingPayments(eventId: string) {
        return await prisma.payment.findMany({
            where: {
                eventId,
                expiry: {
                    gt: new Date(),
                },
            },
        });
    }

    static async isEventHasTickets(event: Event) {
        const pendingPayments = await PaymentsService.getPendingPayments(
            event.id
        );

        return event.tickets - pendingPayments.length >= 0;
    }

    static async createPayment(eventId: string) {
        const minutesToExpired = 2;

        const expiry = new Date(
            new Date().getTime() + minutesToExpired * 60000
        );

        const payment = await prisma.payment.create({
            data: {
                eventId,
                status: "PENDING",
                expiry,
            },
        });

        return payment;
    }

    static async setOrderId(id: string, orderID: string) {
        return await prisma.payment.update({
            where: {
                id,
            },
            data: {
                orderID,
            },
        });
    }

    static async getPaymentByOrderID(orderID: string) {
        const payment = await prisma.payment.findFirst({
            where: {
                orderID,
                expiry: {
                    gt: new Date(),
                },
            },
        });
        return payment;
    }

    static async isOrderExists(orderID: string) {
        return !!this.getPaymentByOrderID(orderID);
    }

    static async setPaidToPayment(orderID: string) {
        return await prisma.payment.updateMany({
            where: {
                orderID,
            },
            data: {
                status: "PAID",
            },
        });
    }
}
