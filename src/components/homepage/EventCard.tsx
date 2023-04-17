import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Spinner } from "flowbite-react";
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
import { Event } from "@/components/eventspage/EventCard";
import { useSession } from "next-auth/react";

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
      className="relative w-[90vw] h-[100vw] md:w-[25vw] md:h-[30vw] overflow-hidden rounded-xl"
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
            ? `, ${event.location.place?.city}`
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
            <span className="p-5 absolute top-5">
              {`${event.name} ${
                event.location.type === "offline"
                  ? event.location.place?.city
                  : ""
              }`}
            </span>
            <div className="flex flex-col gap-5 z-30 text-base w-full align-bottom p-5">
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
                className="p-3 w-1/2 self-center absolute bottom-5 mt-5 text-ueventContrast bg-opacity-50 bg-ueventBg rounded-xl"
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
