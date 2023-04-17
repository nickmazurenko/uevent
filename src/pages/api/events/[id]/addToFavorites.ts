import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

import { getUserByEmail } from "@/lib/users";
import EventService from "@/lib/events/EventService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end("Unauthorized");
  }

  const user = await getUserByEmail(session.user?.email as string);
  const eventId = req.query.id;

  // Check if the eventId is valid
  const event = await prisma.event.findUnique({
    where: { id: eventId as string },
    include: {
      favoritedBy: true,
    },
  });

  if (!event) {
    return res.status(404).end("Event not found");
  }

  const inFavorites = event.favoritedBy.find((usr) => usr.userId === user?.id);

  
  try {
    if (inFavorites) {
      await EventService.removeFromFavorites(event.id, user?.id as string);
      res.status(200).json({ message: "Removed from favorites" });
      return;
    }
    // Update the event attendees
    await EventService.addToFavorites(event.id, user?.id as string);
    res.status(200).json("Added to favorites");
  } catch (error) {
    console.error(error);
    res.status(500).end("Something went wrong");
  }
}
