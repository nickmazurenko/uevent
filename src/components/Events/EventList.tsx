import Image from "next/image";
import JoinButton from "./JoinButton";
import { Event } from "@prisma/client";

export default function EventList({ events } : {events: Event[]}) {
  return (
    <div className="flex flex-col h-full w-full justify-center gap-5 items-center">
      {events.map((event, key) => (
        <div
          className="flex flex-col h-[50vw] relative w-1/2 items-center"
          key={key}
        >
          <Image
            className="absolute w-full h-full z-0"
            src={event.images[0]}
            width={500}
            height={500}
            alt="eventImage"
          />
          <div className="z-20 text-center text-white text-xl font-bold">
            {event.name}
          </div>
          <JoinButton eventId={event.id} />
        </div>
      ))}
    </div>
  );
}
