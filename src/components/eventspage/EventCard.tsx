import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import moment from "moment";
import Link from "next/link";
import { Spinner } from "flowbite-react";

import {
  ImLocation,
  ImCalendar,
  ImUsers,
  ImTicket,
  ImCoinDollar,
} from "react-icons/im";

export type Event = {
  id: string;
  name: string;
  tickets: number;
  images: string[];
  tags: string[];
  purchasedTickets: [];
  cost: { amount: number; currency: string };
  start_at: string;
  favoritedBy: { user: { email: string } }[];
  location: {
    type: "online" | "offline";
    place?: {
      address: string;
      additional?: string;
      country: string;
      city: string;
    };
  };
};

export default function EventCard({ event }: { event: Event }) {
  const [hovered, setHovered] = useState(false);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(status === "loading");
  const [inFavorites, setInFavorites] = useState(
    event?.favoritedBy &&
      event?.favoritedBy.some(
        (item) => item.user.email === session?.user?.email
      )
  );

  useEffect(() => {
    setLoading(status === "loading");
  }, [status]);

  const onAddToFavorites = async (event: Event) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/events/${event.id}/addToFavorites`, {
        method: "POST",
      });
      if (response.ok) {
        const message = await response.json();
        setInFavorites(!inFavorites);
        console.log(message);
      } else {
        const message = await response.json();
        console.error(response.status, response.statusText, message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
                  ? ", " + event.location.place?.city
                  : ""
              }`}
            </span>
            <div className="flex flex-col w-full md:w-2/3 gap-8 z-30 text-base align-bottom p-5">
              <div className="flex flex-row w-full justify-between">
                <span className="flex gap-5 items-center justify-center">
                  <ImLocation size={20} />
                  {event.location.type === "offline"
                    ? `${event.location.place?.country}, ${event.location.place?.city}`
                    : "Online"}
                </span>
                <div
                  onClick={() => onAddToFavorites(event)}
                  className="p-2 rounded-full max-h-9 bg-ueventBg hover:bg-ueventContrast hover:bg-opacity-100 bg-opacity-30"
                >
                  {loading ? (
                    <Spinner size="md" />
                  ) : (
                    <>
                      {inFavorites ? (
                        <AiFillHeart className="text-red-800" size={20} />
                      ) : (
                        <AiOutlineHeart size={20} />
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-row w-full justify-between">
                <span className="flex gap-5 items-center justify-center">
                  <ImCalendar size={20} />
                  {moment(event.start_at).format("MMMM Do")}
                </span>
                <div className="flex flex-row gap-5 px-1">
                  {event.purchasedTickets.length}
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
