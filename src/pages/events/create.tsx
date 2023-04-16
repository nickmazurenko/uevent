import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]";
import OrganizationService from "@/lib/organizations/OrganizationService";
import CreateEvent from "@/components/Events/CreateEvent";
import { User } from "@prisma/client";
import Layout from "@/components/Layout";
import EventFormDescription from "@/components/Events/EventFormDescription";
import { getUserByEmail } from "@/lib/users";

type Props = {
  organization?: any;
};

export default function CreateEventPage(props: Props) {
  return (
    <Layout>
      <div className="relative flex flex-col gap-5 w-full h-full">
        <EventFormDescription />
        <div className="flex flex-wrap w-full h-full justify-between">
          <CreateEvent />
        </div>
      </div>
    </Layout>
  );
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
  const user = await getUserByEmail(session.user.email as string);
  // @ts-ignore
  const organization = await OrganizationService.getUserOrganization(user);

  if (!organization) {
    return {
      redirect: {
        permanent: false,
        destination: "/profile/organization",
      },
      props: {},
    };
  }

  return { props: { organization } };
}
