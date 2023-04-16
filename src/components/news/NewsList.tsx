import { News } from "@prisma/client";
import { Dropdown } from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import { BiSortDown, BiSortUp, BiFilterAlt } from "react-icons/bi";
import NewsCard from "./NewsCard";

export default function NewsList({ news }: { news: News[] }) {
  console.log(news);
  return (
    <div className="w-full h-full flex flex-col p-5 gap-5 items-center justify-center">
      <div className="p-2 py-5 w-full border-b-2 border-ueventContrast gap-5 border-0 flex flex-col md:flex-row md:justify-between justify-center items-center">
        <div className="relative flex items-center self-center w-full">
          <input
            className="relative rounded-lg bg-ueventSecondary w-full md:w-full border-none text-sm p-2 pl-14"
            placeholder="Search..."
          />
          <HiSearch
            size={30}
            className="text-ueventText absolute left-0 ml-3"
          />
        </div>
        <div className="flex flex-row gap-10 items-center justify-between w-full">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <div className="flex flex-row cursor-pointer  w-full min-w-[10vw] justify-between  items-center text-ueventContrast  hover:text-ueventText">
                <span>Date</span>
                <BiSortDown size={30} />
              </div>
            }
          >
            <Dropdown.Item className="min-w-[90vw] md:min-w-[20vw] flex flex-row justify-between">
              <span>Date</span>
              <BiSortUp size={20} />
            </Dropdown.Item>
            <Dropdown.Item className="min-w-[90vw] md:min-w-[20vw] flex flex-row justify-between">
              <span>Organization Name</span>
              <BiSortUp size={20} />
            </Dropdown.Item>
          </Dropdown>
          <div className="rounded-full p-2 text-ueventContrast hover:text-ueventText hover:bg-ueventContrast">
            <BiFilterAlt className="" size={30} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {news.map((item, key) => (
          <NewsCard key={key} news={item} />
        ))}
      </div>
    </div>
  );
}
