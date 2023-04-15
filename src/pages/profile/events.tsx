import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]";
import { getUserByEmail } from "@/lib/users";
import Layout from "@/components/Layout";
import Menu from "@/components/profile/Menu";
import EventsList from "@/components/eventspage/EventsList";
import { Event } from "@/components/eventspage/EventCard";

type Props = {
  events: Event[];
};

export default function UserEvents(props: Props) {
  return (
    <Layout>
      <div className="relative w-full h-full pt-44 md:mr-3">
        <div className="flex flex-col  md:flex-row md:p-8 gap-10 w-full h-full">
          <Menu />
          <div
            style={{ boxShadow: "0px 10px 16px 3px black" }}
            className="w-full h-full flex flex-col py-5 bg-ueventSecondary rounded-2xl gap-10 justify-center justify-items-center items-center"
          >
            <span className="text-2xl text-ueventText text-center">
              Your Events
            </span>
            <EventsList events={props.events} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, options);

  if (!session || !session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  const user = await getUserByEmail(session?.user.email as string);
  return { props: { events: user.tickets?.map((ticket) => ticket.event) } };
}
