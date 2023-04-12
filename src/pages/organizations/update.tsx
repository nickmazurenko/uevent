import Layout from "@/components/Layout";
import UpdateOrganization from "@/components/Organization/UpdateOrganization";
import OrganizationService from "@/lib/organizations/OrganizationService";
import { Organization as Org } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]";

type Props = {
    organization: Org
}

const UpdateOrganizationPage = ({ organization }: Props) => {

    return (
        <Layout>
            <UpdateOrganization organization={organization} />
        </Layout>
    )

}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, options);

    if (!session || !session.user) {
        return {
            redirect: {
              permanent: false,
              destination: "/",
            },
            props: {},
          };
    }


    // @ts-ignore
    const organization = await OrganizationService.getUserOrganization(session.user);

    if (!organization) {
        return {
            redirect: {
              permanent: false,
              destination: "/organizations",
            },
            props: {},
          };
    }


    return { props: { organization } };
};

export default UpdateOrganizationPage;