import { Organization, User } from "@prisma/client";

export const getUserOrganization = async (user: User | null): Promise<Organization | null> => {

    if (!user) return null;

    return await prisma.organization.findFirst({
        where: {
            ownerId: user?.id
        }
    });

}