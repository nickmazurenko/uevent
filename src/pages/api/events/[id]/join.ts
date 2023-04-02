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
  const eventId = req.query.id;

  // Check if the eventId is valid
  const event = await prisma.event.findUnique({
    where: { id: eventId as string },
    include: {
      attendees: true,
    },
  });

  if (!event) {
    return res.status(404).end("Event not found");
  }

  const existingAttendee = event.attendees.find(
    (attendee) => attendee.userId === user?.id
  );

  if (existingAttendee) {
    res.status(409).json({ message: "User already joined the event" });
    return;
  }

  try {
    // Update the event attendees
    await prisma.eventAttendee.create({
      data: { eventId: eventId as string, userId: user?.id },
    });
    res.status(200).json("Attendee created");
  } catch (error) {
    console.error(error);
    res.status(500).end("Something went wrong");
  }
}
