
import OrganizationFormParser, { FormBody } from '@/lib/organizations/OrganizationFormParser';
import OrganizationService from '@/lib/organizations/OrganizationService';
import uploadOrganizationImage from '@/lib/organizations/uploadOrganizationImage';
import { getUserByEmail } from '@/lib/users';
import { User } from '@prisma/client';
import DataURIParser from 'datauri/parser';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import nc from 'next-connect';

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};

const handler = nc(
    {
        onError: (err, req, res: NextApiResponse, next) => {
            console.error(err.stack);
            res.status(500).end("Something broke!");
        },
    }
).use(
    multer().any()
).post(
    async (req: NextApiRequest, res: NextApiResponse) => {
        const session = await getSession({ req });
        if (!session || !session.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {

            const user = await getUserByEmail(session.user?.email || "");

            const organization = await OrganizationService.getUserOrganization(user);
            if (!organization) {
                return res.status(404).json({ error: "Organization not found" });
            }


            const organizationFormParser = new OrganizationFormParser({ requiredFields: [] })
            const {
                name,
                description,
                image
                // @ts-ignore
            } = organizationFormParser.parse(req.body as FormBody, req.files as IFile[]);


            try {

                let cloudinaryImage = null;
                if (image) {
                    cloudinaryImage = await uploadOrganizationImage(image as DataURIParser);
                }

            

                const updateOrganization = await OrganizationService.update(organization, {
                    name,
                    description,
                    image: cloudinaryImage
                });

                res.status(201).json({ data: { organization: updateOrganization } });


            } catch (error) {
                console.error(error);
                res.status(500).json({ error, data: null });
            }


            // @ts-ignore

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            // await prisma.$disconnect();
        }

    }
)

export default handler;