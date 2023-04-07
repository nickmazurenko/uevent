import { Organization, Event } from "@prisma/client";
import TicketService from "../tickets/TicketService";

export interface ICloudinaryImage {
    url: string;
    public_id: string;
    signature: string;
}

export default class EventService {
    static async create(
        owner: Organization,
        name: string,
        description: string,
        startAt: string,
        duration: number,
        images: ICloudinaryImage[],
        tickets: number,
        cost: { amount: number; currency: string },
        location: JSON,
        tags: string[]
    ) {
        const newEvent = await prisma.event.create({
            data: {
                name,
                description,
                images: images.map((image) => image.url),
                tickets,
                start_at: startAt,
                duration,
                cost,
                location,
                tags,
                image_ids: images.map((image) => image.public_id),
                image_signatures: images.map((image) => image.signature),
                organizationId: owner.id,
            },
        });
        return newEvent;
    }

    static async retrieveAll(organizationId?: string, tags?: string[]) {
        const events = await prisma.event.findMany({
            where: { organizationId, tags },
        });
        return events;
    }

    static async buyTickets(
        event: Event,
        buyerId: string,
        ticketsCount: number
    ) {
        const updatedEvent = await prisma.event.update({
            where: {
                id: event.id,
            },
            data: {
                tickets: event.tickets - ticketsCount,
            },
        });

        const ticketsPayload = await TicketService.createTickets(
            event.id,
            buyerId,
            ticketsCount
        );

        return {
            event: updatedEvent,
            ticketsCount: ticketsPayload.count,
        };
    }
}
