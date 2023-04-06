import React, { MouseEventHandler } from "react";
import { useState, useRef } from "react";
import { Tabs, TabsRef, Button } from "flowbite-react";
import EventList from "./EventList";
import { Event } from "@prisma/client";
import Link from "next/link";
// import { Filter } from "@/lib/events/EventService";

export default function HomeEvents(props: {
  className?: string;
  events: Event[];
  filter: string;
  setFilter: (filter: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<string>("upcoming");

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(e.currentTarget.name);
    props.setFilter(e.currentTarget.name as string);
  };

  console.log(activeTab === "new" ? "text-ueventContrast" : "");

  return (
    <div
      className={`flex justify-center flex-col gap-10 mt-10 items-center ${props.className}`}
    >
      <div
        style={{ boxShadow: "0px 10px 16px 3px black" }}
        className="flex flex-row w-full lg:w-1/2 justify-evenly p-2 rounded-lg bg-ueventSecondary"
      >
        <button
          onClick={onClick}
          name="today"
          className={`cursor-pointer py-2 px-4 ${
            activeTab === "today" ? "text-ueventContrast" : "text-ueventText"
          }`}
        >
          Today
        </button>
        <div className="text-2xl">|</div>
        <button
          onClick={onClick}
          name="upcoming"
          className={`cursor-pointer py-2 px-4 ${
            activeTab === "upcoming" ? "text-ueventContrast" : "text-ueventText"
          }`}
        >
          Upcoming
        </button>
        <div className="text-2xl">|</div>
        <button
          name="new"
          onClick={onClick}
          className={`cursor-pointer py-2 px-4 ${
            activeTab === "new" ? "text-ueventContrast" : "text-ueventText"
          }`}
        >
          New
        </button>
        <div className="text-2xl">|</div>
        <button
          name="specials"
          onClick={onClick}
          className={`cursor-pointer py-2 px-4 ${
            activeTab === "specials" ? "text-ueventContrast" : "text-ueventText"
          }`}
        >
          Specials
        </button>
      </div>
      <EventList events={props.events} />
      <Link href="/events" className="p-2 self-center w-1/2 md:w-1/12 text-center text-ueventContrast border-2 rounded-xl hover:border-ueventContrast hover:text-ueventText hover:bg-ueventContrast">Other</Link>
    </div>
  );
}
