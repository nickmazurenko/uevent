import { getUserByEmail } from "@/lib/users";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import nc from "next-connect";
import EventService, { RetrieveAllOptions } from "@/lib/events/EventService";

const handler = nc({
  onError: (err, req, res: NextApiResponse, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
}).get(async (req: NextApiRequest, res: NextApiResponse) => {
  const options = req.query;
  const { tags } = req.body;
  const events = await EventService.retrieveAll({
    ...options,
    tags: tags as string[],
  } as RetrieveAllOptions);

  return res.status(200).json(events);
});

export default handler;
