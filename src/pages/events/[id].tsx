import Layout from "@/components/Layout";
import Event from "@/components/Events/Event";
import { getServerSession } from "next-auth/next";
import { GetServerSidePropsContext } from "next";
import { options } from "../api/auth/[...nextauth]";
import { EventData } from "@/lib/events/EventsFrontService";
import EventService from "@/lib/events/EventService";
import GatherwiseDesc from "@/components/defaults/GatherwiseDesc";
import Description from "@/components/homepage/HomeDescription";
import EventPageHeader from "@/components/eventspage/EventPageHeader";

export type Props = {
  event: EventData;
  eventId: string;
};

export default function EventPage({ event, eventId }: Props) {
  return (
    <Layout>
      <div className="relative flex flex-col gap-20 w-full h-full">
        <EventPageHeader />
        <div className="flex flex-wrap w-full h-full justify-between">
          <Event {...{ event, eventId }} />
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

  const { id } = context.params as { id: string };

  const event = await EventService.retrieveOne(id);

  return { props: { event, eventId: id } };
}
