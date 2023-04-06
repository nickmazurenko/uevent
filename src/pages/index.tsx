import Description from "@/components/homepage/HomeDescription";
import Layout from "../components/Layout";
import HomeEvents from "@/components/homepage/HomeEvents";
import { Event } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import EventService, { Filter } from "@/lib/events/EventService";
import { useEffect, useState } from "react";
import GatherwiseDesc from "@/components/defaults/GatherwiseDesc";

export default function Home(props: { events: Event[] }) {
  const [events, setEvents] = useState<Event[]>(props.events);
  const [filter, setFilter] = useState<string>("upcoming");
  useEffect(() => {
    async function fetchEvents() {
      const params = new URLSearchParams({ filter });
      const response = await fetch(`/api/events/retrieve?${params}`);
      setEvents(await response.json());
    }
    fetchEvents();
  }, [filter]);

  return (
    <>
      <Layout>
        <div className="relative flex flex-col gap-5 w-full h-full">
          <Description />
          <HomeEvents filter={filter} setFilter={setFilter} events={events} />
          <GatherwiseDesc />
        </div>
        {/* <p className="h-screen">Hello there</p> */}
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // @ts-ignore
  const events = await EventService.retrieveAll({
    filter: Filter.upcoming,
    quantity: 8,
  });
  console.log(events);
  return {
    props: {
      events,
    },
  };
}
