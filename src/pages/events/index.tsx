import Layout from "@/components/Layout";
import { Event } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]";
import OrganizationService from "@/lib/organizations/OrganizationService";
import CreateEvent from "@/components/Events/CreateEvent";

type Props = {
  event?: Event | undefined;
};

const EventsPage = ({events}: Props) => {
  return (
    <Layout>
      <CreateEvent/>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, options);
  
  if(!session || !session.user) {
    return {redirect: '/signin'}
  }

  // @ts-ignore
  const organization = await OrganizationService.getUserOrganization(session.user);

  return {props: {organization}};
}

export default EventsPage;