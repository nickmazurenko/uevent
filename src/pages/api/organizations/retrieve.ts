import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import OrganizationService from "@/lib/organizations/OrganizationService";

const handler = nc({
    onError: (err, req, res: NextApiResponse, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
}).get(async (req: NextApiRequest, res: NextApiResponse) => {

    const {id} = req.query;
    const events = await OrganizationService.retrieveOne(id);

    return res.status(200).json(events);

});

export default handler;