import Layout from "@/components/Layout";
import { Event } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import CreateEvent from "@/components/Events/CreateEvent";
import EventService from "@/lib/events/EventService";
import EventsDescription from "@/components/eventspage/EventsDescription";
import TagList from "@/components/eventspage/TagList";
import { useEffect, useState } from "react";
import EventList from "@/components/homepage/EventList";
import EventsList from "@/components/eventspage/EventsList";
import ContactUs from "@/components/eventspage/ContactUs";

const MAX_TAG_NUMBER = 3;

type Props = {
  events?: Event[] | undefined;
  tags?: string[] | undefined;
};

const EventsPage = (props: Props) => {
  const [chosenTags, setChosenTags] = useState<string[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[] | undefined>(
    props.events
  );

  const onTagClick = (e: { target: { id: string } }) => {
    const tag = e.target.id;
    chosenTags.includes(tag)
      ? setChosenTags(chosenTags.filter((elm) => elm !== tag))
      : chosenTags.length < MAX_TAG_NUMBER &&
        setChosenTags([...chosenTags, tag]);
  };

  useEffect(() => {
    if (chosenTags.length > 0) {
      setFilteredEvents(
        props.events?.filter((event) =>
          chosenTags.every((tag) => event.tags.includes(tag))
        )
      );
    } else {
      setFilteredEvents(props.events);
    }
  }, [chosenTags]);

  const onEventTypeClick = (eventType: string) => {
    console.log(eventType);
    setFilteredEvents(
      props.events?.filter((event) => event.location.type === eventType)
    );
  };

  return (
    <Layout>
      <div className="relative flex flex-col gap-5 w-full h-full">
        <EventsDescription />
        <div className="flex flex-wrap w-full h-full justify-between">
          <TagList
            chosen={chosenTags}
            onTagClick={onTagClick}
            setEventType={onEventTypeClick}
            className="w-full md:w-1/4"
            tags={props.tags as string[]}
          />
          <div className="w-full md:w-3/4">
            <EventsList events={filteredEvents} />
          </div>
          <div className="w-full h-full p-5 pt-10">
            <ContactUs />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const events = await EventService.retrieveAll();
  const tags = await EventService.retrieveTags();
  return { props: { events, tags } };
}

export default EventsPage;
