import { ChronosService } from "../chronos";
import EventService from "../events/EventService";
import prisma from "@/lib/prisma";


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
        const event = await EventService.retrieveOne(eventId);
        if (!event) {
            throw new Error("Bad event id");
        }

        const user = await prisma.user.findFirst({ where: { id: buyerId } });

        if (!user) {
            throw new Error("Bad user id");
        }

        const calendars = await ChronosService.getUserCalendars(user);

        if (calendars.length > 0) {
            const addEventResult = await ChronosService.addEvent(
                event,
                user,
                calendars[0].name
            );

            if (addEventResult) {
                console.log(addEventResult);
            }
        }

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
