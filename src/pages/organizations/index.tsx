import Layout from "@/components/Layout"
import CreateOrganization from "@/components/Organization/CreateOrganization";
import Organization from "@/components/Organization/Organization";
import OrganizationService from "@/lib/organizations/OrganizationService";
import { Organization as Org } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]";

type Props = {
    organization?: Org | undefined
}

const OrganizationPage = ({ organization }: Props) => {
    return (
        <Layout>
            {
                organization 
                ?
                <Organization organization={organization}></Organization>
                :
                <CreateOrganization />                
            }
        </Layout>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, options);

    if (!session || !session.user) {
        return { redirect: '/signin' }
    }


    // @ts-ignore
    const organization = await OrganizationService.getUserOrganization(session.user);
    

    return { props: { organization } };
};

export default OrganizationPage;