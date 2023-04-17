import moment from "moment";
import SlideShow from "../defaults/SlideShow";
import { EventData } from "../../lib/events/EventsFrontService";
import Button from "../defaults/Buttons/Button";
import BuyTicketsButton from "./BuyTicketsButton";
import Image from "next/image";
import Link from "next/link";
import { ImTicket } from "react-icons/im";
import { useEffect } from "react";
import { BiLocationPlus } from "react-icons/bi";

type Props = {
  event: EventData;
  eventId: string;
};

export default function Event({ event, eventId }: Props) {
  const duration = moment.duration(event.duration);

  useEffect(() => {
    if(event.location.type === 'offline')
    myCustomLoadFunction(event.location.place.coordinates);
  }, []);

  const durationString = `${
    duration.days()
      ? duration.days() + (duration.days() > 1 ? " days" : "day")
      : ""
  } ${
    duration.hours()
      ? duration.hours() + (duration.hours() > 1 ? " hours" : "hour")
      : ""
  } ${duration.minutes() ? duration.minutes() + " minutes" : ""} `;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 ">
      <div className="w-full lg:w-2/3 p-10 flex flex-col items-center justify-center text-ueventText gap-5 bg-ueventSecondary rounded-xl drop-shadow-xl">
        <div className="flex flex-col gap-5 lg:flex-row text-sm text-gray-600 justify-between w-full">
          <p>
            {moment(event.start_at).format("LLLL")}, for {durationString}
          </p>
          <p>{moment(event.start_at).fromNow()}</p>
        </div>
        <div className="flex flex-col-reverse gap-5 lg:flex-row items-center w-full justify-between">
          <h1 className="text-2xl text-center lg:text-4xl font-bold w-full">
            {event.name}
          </h1>
          <Link href={`/organizations/${event.organization.id}`}>
            <div className="flex flex-row w-full gap-5 px-10 p-4 bg-ueventBg rounded-2xl justify-center items-center">
              <Image
                alt="orgImage"
                src={event.organization?.image}
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="text-ueventContrast">
                {event.organization.name}
              </span>
            </div>
          </Link>
        </div>
        {event.images && event.images.length && (
          <div className="flex flex-col w-full items-center justify-center">
            <SlideShow images={event.images} />
          </div>
        )}

        <div className="flex flex-col gap-4 w-full justify-center">
          <div className="flex flex-wrap w-full gap-2">
            {event.tags.map((tag, key) => (
              <p className="bg-ueventContrast p-2 text-xs rounded-md" key={key}>
                {tag}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-10 w-full border-y-2 border-ueventContrast px-2 py-10 justify-center items-center">
            <span className="font-bold text-2xl text-center">
              Event Description
            </span>
            <p className="py-4 w-full text-gray-500 whitespace-pre-wrap">
              {event.description}
            </p>
            {event.location.type === "online" && (
              <div className="flex flex-row w-full justify-between">
                <span className="font-bold text-xl">Link</span>
                <span className="text-sm border-0 border-b-2 p-2 border-red-800">
                  Link only available for users who joined the event
                </span>
              </div>
            )}
            {event.location.type === "offline" && (
              <div className="w-full flex-col gap-10 flex justify-center items-center">
                <div className="flex flex-row w-full justify-between">
                  <span className="font-bold text-xl">Location</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${
                      event.location.place.coordinates.lat
                    },${
                      event.location.place.coordinates.lng
                    }&zoom=${15}&markers=${
                      event.location.place.coordinates.lat
                    },${event.location.place.coordinates.lng}`}
                    className="text-sm text-ueventText p-2 bg-ueventContrast rounded-xl"
                  >
                    Go to GOOGLE MAPS
                  </a>
                </div>
                <div className=" flex flex-col md:flex-row w-full items-center gap-4 relative ">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex flex-row items-center gap-2 mb-2 text-lg">
                      <BiLocationPlus size={30} />
                      <span className="sb-title">Address</span>
                    </div>
                    <input
                      className="border-b-2 border-b-ueventContrast border-0 bg-transparent"
                      type="text"
                      placeholder="Address"
                      name="address"
                      disabled={true}
                      value={event.location.place.address}
                      id="location-input"
                    />
                    <input
                      className="border-b-2 border-b-ueventContrast border-0 bg-transparent"
                      type="text"
                      name="additional"
                      disabled={true}
                      value={event.location.place.additional}
                      placeholder="Apt, Suite, etc (optional)"
                    />
                    <input
                      className="border-b-2 border-b-ueventContrast border-0 bg-transparent"
                      type="text"
                      placeholder="City"
                      name="city"
                      disabled={true}
                      value={event.location.place.city}
                      id="locality-input"
                    />
                    <input
                      className="w-full border-b-2 border-b-ueventContrast border-0 bg-transparent"
                      type="text"
                      placeholder="Country"
                      name="country"
                      disabled={true}
                      value={event.location.place.country}
                      id="country-input"
                    />
                  </div>
                  <div
                    className="map rounded-lg"
                    style={{ height: "300px", width: "100%" }}
                    id="gmp-map"
                  ></div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-row py-5  rounded-xl text-center gap-5 w-full justify-center items-center">
            <div className="w-full flex flex-col items-center justify-center gap-2">
              <span className="font-bold text-xl w-full">Cost</span>
              <div className="w-full flex flex-row gap-1 text-ueventContrast items-center justify-center">
                <p>{event.cost.amount + " " + event.cost.currency} /</p>
                <ImTicket size={20} />
              </div>
              <BuyTicketsButton event={event} eventId={eventId} />
            </div>
            <div className="bg-ueventContrast bg-opacity-25 w-full py-5 rounded-xl flex flex-col gap-5">
              <span className="font-bold text-lg">Amount of tickets left</span>
              <div className="flex flex-row w-full gap-5 justify-center">
                <p className="text-2xl">{event.tickets}</p>
                <ImTicket size={30} className="text-ueventText" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MAP_OPTIONS = {
  center: { lat: 37.4221, lng: -122.0841 },
  fullscreenControl: true,
  mapTypeControl: false,
  streetViewControl: true,
  zoom: 11,
  zoomControl: true,
  maxZoom: 22,
  mapId: "",
};

const myCustomLoadFunction = async (address) => {
  try {
    const { Loader } = await import("@googlemaps/js-api-loader");
    const loader = new Loader({
      apiKey: "AIzaSyC8AQMHs7vNcQgwd-VAHsbG-kotPHI5ws8",
      version: "weekly",
      libraries: ["places"],
    });
    await loader.load();
    // @ts-ignore
    const map = new window.google.maps.Map(
      document.getElementById("gmp-map"),
      MAP_OPTIONS
    );
    // @ts-ignore
    const marker = new window.google.maps.Marker({
      map: map,
      draggable: false,
    });

    map.setCenter(address);
    marker.setPosition(address);
    marker.setVisible(true);
  } catch (e) {
    console.error(e);
  }
};
