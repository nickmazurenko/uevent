import { NextApiRequest, NextApiResponse } from "next";
import DataURIParser from "datauri/parser";
import multer from "multer";
import nc from "next-connect";
import { getSession } from "next-auth/react";
import { getUserByEmail } from "@/lib/users";
import EventFormParser, {
    FormBody,
    IFile,
    EventFormFields,
} from "@/lib/events/EventFormParser";
import EventService from "@/lib/events/EventService";
import OrganizationService from "@/lib/organizations/OrganizationService";
import { Organization } from "@prisma/client";
import uploadEventImage from "@/lib/events/uploadEventImage";
import path from "path";
import cloudinary from "@/lib/cloudinary";

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = nc({
    onError: (err, req, res: NextApiResponse, next) => {
        console.error(err.stack);
        res.status(500).end("Something went wrong!");
    },
})
    .use(multer().any())
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        const session = await getSession({ req });
        if (!session || !session.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        try {
            const user = await getUserByEmail(session.user?.email || "");
            const organization = await OrganizationService.getUserOrganization(
                user
            );
            if (!organization) {
                return res
                    .status(400)
                    .json("Cannot create an event without organization");
            }

            const ticketViewId = req.body.ticketViewId;

            console.log(req.body);

            const image = req.files[0];

            const imageParser = new DataURIParser();
            const base64Image = imageParser.format(
                path.extname(image.originalname),
                image.buffer
            );

            console.log(base64Image);

            const uploadImageResponse = await cloudinary.uploader.upload(
                base64Image.content,
                "uevent",
                { response_type: "image" }
            );
            console.log(uploadImageResponse);

            await prisma.ticketView.update({
                where: {
                    id: ticketViewId,
                },
                data: {
                    image: uploadImageResponse.url,
                    image_id: uploadImageResponse.public_id,
                    image_signature: uploadImageResponse.signature,
                },
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });

export default handler;
