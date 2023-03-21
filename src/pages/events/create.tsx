import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]";
import OrganizationService from "@/lib/organizations/OrganizationService";


type Props = { 
  
}

const CreateEventPage = ({}: Props) => {
  return (
    <Layout>
      
    </Layout>
  );
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, options);

  if (!session || !session.user) {
    return { redirect: "/signin" };
  }

  // @ts-ignore
  const organization = await OrganizationService.getUserOrganization(session.user);

  if (!organization) {
    return { redirect: "/organizations" };
  }

  return { props: { organization } };
}
