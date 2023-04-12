import { Event } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  ImLocation,
  ImCalendar,
  ImUsers,
  ImTicket,
  ImCoinDollar,
} from "react-icons/im";

import { BiHeart, BiSortDown, BiSortUp } from "react-icons/bi";
import moment from "moment";
import Link from "next/link";
import { Dropdown } from "flowbite-react";
import { Sort, SortOptions } from "@/pages/events";

type Props = {
  className?: string;
  events: Event[];
  sort: Sort | null;
  setSort: (option: string) => void;
};

function EventCard({ event }: { event: Event }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full h-[100vw] md:h-[20vw] rounded-2xl overflow-hidden flex items-center relative justify-center"
    >
      <Image
        className="w-full h-full object-cover z-0 brightness-[0.65]"
        src={event.images[0]}
        alt="Event Thumbnail"
        fill
        sizes=""
      />
      <span className="flex flex-col gap-10 absolute top-5 md:inset-10 text-ueventText text-2xl">
        <span className="text-center md:text-left">{event.name}</span>
        <div className="flex flex-wrap gap-2 justify-center md:justify-start text-xs w-full md:w-1/2">
          {event.tags.map((tag, key) => (
            <span
              key={key}
              className="p-2 text-ueventText rounded-xl bg-ueventContrast"
            >
              {tag}
            </span>
          ))}
        </div>
      </span>
      <div className="absolute flex flex-row gap-2 bottom-5 right-10 text-ueventContrast">
        <ImLocation size={20} /> {event.location.type}
      </div>
      <AnimatePresence initial={false}>
        {hovered && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-col md:flex-row md:gap-16 absolute bottom-0 z-20 h-full backdrop-blur-lg w-full text-ueventText text-2xl text-center items-center justify-center flex"
          >
            <span className="p-5 text-center left-5 w-full md:w-1/3">
              {`${event.name}${
                event.location.type === "offline"
                  ? ", " + event.location.place.city
                  : ""
              }`}
            </span>
            <div className="flex flex-col w-full md:w-2/3 gap-8 z-30 text-base align-bottom p-5">
              <div className="flex flex-row w-full justify-between">
                <span className="flex gap-5 items-center justify-center">
                  <ImLocation size={20} />
                  {event.location.type === "offline"
                    ? `${event.location.place.country}, ${event.location.place.city}`
                    : "Online"}
                </span>
                <div className="p-2 rounded-full max-h-9 bg-ueventBg bg-opacity-30">
                  <BiHeart size={20} />
                </div>
              </div>
              <div className="flex flex-row w-full justify-between">
                <span className="flex gap-5 items-center justify-center">
                  <ImCalendar size={20} />
                  {moment(event.start_at).format("MMMM Do")}
                </span>
                <div className="flex flex-row gap-5 px-1">
                  {event.attendees.length}
                  <ImUsers size={25} />
                </div>
              </div>
              <div className="flex flex-row w-full justify-between">
                <span className="flex gap-5 items-center justify-center">
                  <ImTicket size={25} />
                  {event.tickets}
                </span>
                <div className="flex flex-row gap-2 px-1 text-xl font-bold items-center">
                  <span>{`${event.cost.amount} ${event.cost.currency}`}</span>
                  <ImCoinDollar size={25} />
                </div>
              </div>
              <Link
                href={`/events/${event.id}`}
                className="p-3 w-1/2 self-center bottom-5 mt-5 text-ueventContrast bg-opacity-50 bg-ueventBg rounded-xl"
              >
                More Info
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EventsList(props: Props) {
  return (
    <div className={`flex flex-col p-5 gap-10 h-full ${props.className}`}>
      <div className="flex flex-col gap-5 md:flex-row md:justify-between justify-center items-center w-full">
        <span className="text-2xl text-ueventText text-left font-bold w-full md:w-1/3">
          Choose an event to find more like-minded people
        </span>
        <div className="flex flex-row gap-5 w-full md:w-2/3">
          <input
            className="bg-ueventBg border-b-2 w-2/3 border-ueventContrast text-ueventText"
            placeholder="Search for events..."
          />
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <div className="flex flex-row cursor-pointer  w-full min-w-[10vw] justify-between  items-center text-ueventContrast  hover:text-ueventText">
                <span>{props.sort ? props.sort.option : "Sort by"}</span>
                {props.sort && props.sort.asc ? (
                  <BiSortDown size={30} />
                ) : (
                  <BiSortUp size={30} />
                )}
              </div>
            }
          >
            <Dropdown.Item
              onClick={() => props.setSort(SortOptions.date)}
              className="min-w-[90vw] md:min-w-[20vw] flex flex-row justify-between"
            >
              <span>Date</span>
              <BiSortUp size={20} />
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => props.setSort(SortOptions.price)}
              className="min-w-[90vw] md:min-w-[20vw] flex flex-row justify-between"
            >
              <span>Price</span>
              <BiSortUp size={20} />
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => props.setSort(SortOptions.peopleNumber)}
              className="min-w-[90vw] md:min-w-[20vw] flex flex-row justify-between"
            >
              <span>Number of People</span>
              <BiSortUp size={20} />
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => props.setSort(SortOptions.ticketNumber)}
              className="min-w-[90vw] md:min-w-[20vw] flex flex-row justify-between"
            >
              <span>Number of Tickets</span>
              <BiSortUp size={20} />
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      {props.events.map((event, key) => (
        <EventCard key={key} event={event} />
      ))}
    </div>
  );
}
