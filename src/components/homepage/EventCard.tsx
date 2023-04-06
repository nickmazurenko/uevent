import { Event } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ImLocation,
  ImCalendar,
  ImUsers,
  ImTicket,
  ImCoinDollar,
} from "react-icons/im";
import { BiHeart } from "react-icons/bi";
import moment from "moment";
import Link from "next/link";

export default function EventCard({ event }: { event: Event }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-[90vw] h-[100vw] md:w-[20vw] md:h-[25vw] overflow-hidden rounded-xl"
    >
      <Image
        alt="EventThumbnail"
        className="z-0 rounded-2xl object-cover"
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        fill
        src={event.images[0]}
      />
      <div className="absolute bottom-0 z-20 h-1/6 backdrop-blur-xl w-full text-ueventText text-xl text-center items-center justify-center flex">
        {`${event.name}${
          event.location.type === "offline"
            ? `, ${event.location.place.city}`
            : ""
        }`}
      </div>
      <AnimatePresence initial={false}>
        {hovered && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-col gap-16 absolute bottom-0 z-20 h-full backdrop-blur-lg w-full text-ueventText text-2xl text-center items-center justify-center flex"
          >
            <span className="p-5">
              {`${event.name} ${
                event.location.type === "offline"
                  ? event.location.place.city
                  : ""
              }`}
            </span>
            <div className="flex flex-col gap-4 z-30 text-base w-full align-bottom p-5">
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
                className="p-3 w-1/2 self-center mt-5 text-ueventContrast bg-opacity-50 bg-ueventBg rounded-xl"
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
