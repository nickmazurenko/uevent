export default class TicketService {
    static async createTicket(eventId: string, buyerId: string) {
        return await prisma.ticket.create({
            data: {
                eventId,
                userId: buyerId,
            },
        });
    }

    static async createTickets(
        eventId: string,
        buyerId: string,
        count: number
    ) {
        return await prisma.ticket.createMany({
            data: Array(count)
                .fill(0)
                .map((index) => {
                    return {
                        eventId,
                        userId: buyerId,
                    };
                }),
        });
    }
}
