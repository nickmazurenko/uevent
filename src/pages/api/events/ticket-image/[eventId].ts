import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

import { getUserByEmail } from "@/lib/users";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).end("Unauthorized");
    }

    const user = await getUserByEmail(session.user?.email as string);
    const eventId = req.query.eventId as string;

    const ticketView = await prisma.ticketView.findFirst({
        where: {
            eventId,
        },
    });

    if (!ticketView) {
        return res.status(404).end("Event not found");
    }

    try {
        // Update the event attendees

        res.status(200).json({ data: { img: ticketView.image } });
    } catch (error) {
        console.error(error);
        res.status(500).end("Something went wrong");
    }
}
