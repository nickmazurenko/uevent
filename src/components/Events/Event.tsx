import moment from "moment";
import SlideShow from "../defaults/SlideShow";
import { EventData } from '../../lib/events/EventsFrontService';
import Button from "../defaults/Buttons/Button";
import BuyTicketButton from "./BuyTicketButton";

type Props = {
  event: EventData;
  eventId: string
};

export default function Event({ event, eventId }: Props) {
  const duration = moment.duration(event.duration);

  const durationString = `${duration.days() ? duration.days() + " days" : ""} ${duration.hours() ? duration.hours() + " hours" : ""
    } ${duration.minutes() ? duration.minutes() + " minutes" : ""} `;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <h1 className="text-4xl font-bold">{event.name}</h1>
      <div className="flex flex-row justify-between w-full">
        <p>{moment(event.startAt).format("LLLL")}</p>
        <p>{moment(event.startAt).fromNow()}</p>
      </div>
      <div>
        <BuyTicketButton {...{ eventId }} />
      </div>
      {event.image && <SlideShow images={event.image} />}
      <div className="flex flex-col gap-4 w-full justify-center">
        <p>Duration: {durationString}</p>
        <div className="flex flex-wrap w-full gap-4">
          {event.tags.map((tag, key) => (
            <p className="bg-green-500 p-2 rounded-md" key={key}>
              {tag}
            </p>
          ))}
        </div>
        <span className="font-bold text-2xl text-center">Description</span>
        <p>{event.description}</p>
        <div className="flex flex-row justify-between w-1/2">
          <div className="flex flex-col text-center">
            <span className="font-bold text-xl">Cost</span>
            <p>{event.cost.amount + " " + event.cost.currency}</p>
          </div>
          <div className="flex flex-col text-center">
            <span className="font-bold text-xl">Amount of tickets left</span>
            <p>{event.tickets}</p>
          </div>
          <div>

          </div>
        </div>
        {event.location.type === "online" && (
          <div className="flex flex-row w-1/2 justify-between">
            <span className="font-bold text-xl">Link</span>
            <span className="text-sm">{event.location.link}</span>
          </div>
        )}
        {event.location.type === "offline" && (
          <div className="flex flex-row w-full justify-between">
            <span className="font-bold text-xl">Location</span>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${event.location.place.coordinates.lat
                },${event.location.place.coordinates.lng}&zoom=${15}&markers=${event.location.place.coordinates.lat
                },${event.location.place.coordinates.lng}`}
              className="text-sm border-bottom border-blue-800 text-blue-800"
            >
              GOOGLE MAPS
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
