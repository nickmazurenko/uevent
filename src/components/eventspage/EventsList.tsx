import { Event } from "./EventCard";
import Image from "next/image";
import { useEffect, useState } from "react";

import { BiSortDown, BiSortUp } from "react-icons/bi";
import moment from "moment";
import Link from "next/link";
import { Dropdown } from "flowbite-react";
import EventCard from "./EventCard";

type Props = {
  className?: string;
  events: Event[];
  removeMenu?: boolean;
};

export const enum SortOptions {
  price = "Price",
  ticketNumber = "Number of Tickets",
  peopleNumber = "Number of People",
  date = "Date",
}

export type Sort = {
  option: SortOptions;
  asc: boolean;
};

const sortByDate = (events: Event[], asc: boolean): Event[] => {
  return asc
    ? events.sort(
        (first: Event, second: Event) =>
          // @ts-ignore
          new Date(second.start_at) - new Date(first.start_at)
      )
    : events.sort(
        (first: Event, second: Event) =>
          // @ts-ignore
          new Date(first.start_at) - new Date(second.start_at)
      );
};

const sortEvents = (events: Event[], sort: Sort) => {
  switch (sort.option) {
    case SortOptions.date:
      return sortByDate(events, sort.asc);
    case SortOptions.price:
      return events.sort((a: Event, b: Event) =>
        sort.asc ? a.cost.amount - b.cost.amount : b.cost.amount - a.cost.amount
      );
      break;
    case SortOptions.peopleNumber:
      // add code to sort by number of people
      break;
    case SortOptions.ticketNumber:
      return events.sort((a: Event, b: Event) =>
        sort.asc ? a.tickets - b.tickets : b.tickets - a.tickets
      );
      break;
    default:
      return events;
  }
};

export default function EventsList(props: Props) {
  const [sortedEvents, setSortedEvents] = useState(props.events);

  const [sort, setSort] = useState<Sort | null>(null);
  const [search, setSearch] = useState("");

  const onSortClick = (option: SortOptions) => {
    if (option === sort?.option) {
      setSort({ ...sort, asc: !sort.asc }); // update asc based on the current value
      setSortedEvents(
        sortEvents(props.events, { ...sort, asc: !sort.asc }) as Event[]
      ); // update sortedEvents state
    } else {
      setSort({ option, asc: false }); // always set asc to true when changing the option
      setSortedEvents(
        sortEvents(props.events, { option, asc: false }) as Event[]
      ); // update sortedEvents state
    }
  };
  useEffect(() => {
    if (search.length) {
      setSortedEvents((prevSortedEvents) =>
        prevSortedEvents.filter(
          (event) =>
            event.name.includes(search.toLowerCase()) ||
            event.location?.place?.city
              ?.toLowerCase()
              .includes(search.toLowerCase())
        )
      );
    } else {
      setSortedEvents(props.events);
    }
  }, [props.events, search]);

  return (
    <div className={`flex flex-col p-5 gap-10 h-full ${props.className}`}>
      {props.removeMenu ? null : (
        <div className="flex flex-col gap-5 md:flex-row md:justify-between justify-center items-center w-full">
          <span className="text-2xl text-ueventText text-left font-bold w-full md:w-1/3">
            Choose an event to find more like-minded people
          </span>
          <div className="flex flex-row gap-5 w-full md:w-2/3">
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="bg-transparent border-b-2 w-2/3 border-ueventContrast text-ueventText"
              placeholder="Event name or city..."
            />
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <div className="flex flex-row cursor-pointer  w-full min-w-[10vw] justify-between  items-center text-ueventContrast  hover:text-ueventText">
                  <span>{sort ? sort.option : "Sort by"}</span>
                  {sort && sort.asc ? (
                    <BiSortDown size={30} />
                  ) : (
                    <BiSortUp size={30} />
                  )}
                </div>
              }
            >
              <Dropdown.Item
                onClick={() => onSortClick(SortOptions.date)}
                className="min-w-[90vw] md:min-w-[20vw] flex flex-row justify-between"
              >
                <span>Date</span>
                <BiSortUp size={20} />
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onSortClick(SortOptions.price)}
                className="min-w-[90vw] md:min-w-[20vw] flex flex-row justify-between"
              >
                <span>Price</span>
                <BiSortUp size={20} />
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onSortClick(SortOptions.peopleNumber)}
                className="min-w-[90vw] md:min-w-[20vw] flex flex-row justify-between"
              >
                <span>Number of People</span>
                <BiSortUp size={20} />
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onSortClick(SortOptions.ticketNumber)}
                className="min-w-[90vw] md:min-w-[20vw] flex flex-row justify-between"
              >
                <span>Number of Tickets</span>
                <BiSortUp size={20} />
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      )}
      {sortedEvents.map((event, key) => (
        <EventCard key={key} event={event} />
      ))}
    </div>
  );
}
