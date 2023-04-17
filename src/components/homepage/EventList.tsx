import { Event } from "@prisma/client";
import EventCard from "./EventCard";
import CardLoader from "../defaults/Loaders/CardPlacehoder";

export default function EventList({ events }: { events: Event[] }) {
  return (
    <div className="flex flex-wrap gap-4 w-full h-full items-center justify-center">
      {events ? (
        events.map((event: Event, key: number) => (
          <EventCard key={key} event={event} />
        ))
      ) : (
        <>
          <CardLoader />
          <CardLoader />
          <CardLoader />
        </>
      )}
    </div>
  );
}
