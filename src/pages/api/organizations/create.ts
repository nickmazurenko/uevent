import { NextApiRequest, NextApiResponse } from 'next';
import DataURIParser from 'datauri/parser';
import multer from 'multer';
import nc from 'next-connect';
import { getSession } from 'next-auth/react';
import { getUserByEmail } from '@/lib/users';
import OrganizationFormParser, { FormBody, IFile, OrganizationFormFields } from '@/lib/organizations/OrganizationFormParser';
import uploadOrganizationImage from '@/lib/organizations/uploadOrganizationImage';
import OrganizationService from '@/lib/organizations/OrganizationService';
import { User } from '@prisma/client';

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

            const user = await getUserByEmail(session.user?.email || "");

            if (await OrganizationService.getUserOrganization(user)) {
                return res.status(400).json("User can create only one organization");
            }

            const organizationFormParser = new OrganizationFormParser({ requiredFields: OrganizationFormFields.All })
            const {
                name,
                description,
                image
                // @ts-ignore
            } = organizationFormParser.parse(req.body as FormBody, req.files as IFile[]);


            try {


                const cloudinaryImage = await uploadOrganizationImage(image as DataURIParser);
                const newOrganization = await OrganizationService.create(
                    user as User,
                    name as string,
                    description as string,
                    cloudinaryImage
                );

                res.status(201).json({ data: { organization: newOrganization } });


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
    })

export default handler;