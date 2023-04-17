import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]";
import { getUserByEmail } from "@/lib/users";
import Layout from "@/components/Layout";
import Menu from "@/components/profile/Menu";
import EventsList from "@/components/eventspage/EventsList";
import { Event } from "@/components/eventspage/EventCard";
import { Ticket } from "@prisma/client";
import { useEffect, useState } from "react";

type Props = {
  tickets: Ticket[];
};

export default function UserEvents(props: Props) {

  const tickets = props.tickets;
  const eventIds: string[] = [];

  tickets.forEach(ticket => {
    if (eventIds.includes(ticket.eventId)) {
      return;
    }
    eventIds.push(ticket.eventId);
  })

  const defaultImages = {};
  eventIds.forEach(eventId => {
    defaultImages[eventId] = null;
  });

  const [images, setImages] = useState(defaultImages);

  useEffect(() => {

    eventIds.forEach(async (eventId) => {
      const res = await fetch(`/api/events/ticket-image/${eventId}`);
      const imageURL = (await res.json()).img;
      console.log("Image URL: " + imageURL);
      setImages({
        ...images,
        [eventId]: imageURL
      })
    })

  }, []);

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
              Your Tickets
            </span>
            {
              tickets.map(ticket => {
                return (
                  <div key={ticket.id}>
                    <img src={images[ticket.eventId] || ""} alt="ticekt-view" />
                  </div>)
              })
            }
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
  return { props: { tickets: user.tickets } };
}
