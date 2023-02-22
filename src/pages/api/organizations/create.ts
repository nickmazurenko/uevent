import { NextApiRequest, NextApiResponse } from 'next';
import DataURIParser from 'datauri/parser';
import multer from 'multer';
import nc from 'next-connect';
import { getSession } from 'next-auth/react';
import prisma from 'prisma/prisma';
import path from 'path';
import cloudinary from '@/lib/cloudinary';
import { getUserOrganization } from '@/lib/organizations';
import { getUserByEmail } from '@/lib/users';

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
};



const handler = nc({
    onError: (err, req, res: NextApiResponse, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
      },
})
    .use(multer().any())
    .post(async (req: NextApiRequest, res: NextApiResponse) => {

        const session = await getSession({ req });
        if (!session || !session.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const { name, description } = req.body;
            const image = req.files.find(file => file.fieldname === "organizationImage");

            const user = await getUserByEmail(session.user?.email || "");

            if (await getUserOrganization(user)) {
                return res.status(400).json("User can create only one organization");
            }

            const parser = new DataURIParser();

            try {

                const createImage = async (image) => {
                    const base64Image = parser.format(path.extname(image.originalname), image.buffer);
                    const uploadImageResponse = cloudinary.uploader.upload(base64Image.content, "uevent", { resource_type: "image" });
                    return uploadImageResponse;
                }

                const createdImage = await createImage(image);
                const imageURL = createdImage.url;
                console.log(imageURL);
                const image_id = createdImage.public_id;
                const image_signature = createdImage.signature;



                const newOrganization = await prisma.organization.create({
                    data: {
                        name,
                        ownerId: user?.id,
                        description,
                        image: imageURL,
                        image_id,
                        image_signature
                    },
                });

                res.status(201).json(newOrganization);


            } catch (error) {
                console.error(error);
                res.status(500).json({ error, data: null });
            }


            // @ts-ignore
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            await prisma.$disconnect();
        }
    })

export default handler;