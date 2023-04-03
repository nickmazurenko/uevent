import { getUserByEmail } from "@/lib/users";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import nc from "next-connect";
import OrganizationService from "@/lib/organizations/OrganizationService";

const handler = nc({
    onError: (err, req, res: NextApiResponse, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
}).post(async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await getSession({ req });
    if (!session || !session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await getUserByEmail(session.user?.email || "");
    const organization = await OrganizationService.getUserOrganization(user);

    await prisma.event.deleteMany({
        where: {
            organizationId: organization?.id
        }
    })

    await prisma.organization.delete({
        where: {
            id: organization?.id
        }
    });

    return res.status(200).json({ message: "Organization deleted" });

});

export default handler;