import { Accordion, Label, Radio } from "flowbite-react";
import { useEffect, useState } from "react";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  className?: string;
  onTagClick?: (e: any) => void;
  setEventType?: (e: any) => void;
  chosen?: string[];
  tags: string[];
};

export default function TagList({
  tags,
  className,
  onTagClick,
  setEventType,
  chosen,
}: Props) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(tags);
  const [hide, setHide] = useState(true);
  useEffect(() => {
    if (search.length) setFiltered(tags.filter((tag) => tag.includes(search)));
    else setFiltered(tags);
  }, [search, tags]);

  return (
    <div
      className={`z-30 p-8 flex flex-col gap-5 capitalize text-left text-ueventText text-xl ${className}`}
    >
      <div className="flex flex-row justify-between items-center gap-5 text-2xl font-bold mb-5 w-full">
        <span>All categories</span>
        {hide ? (
          <BsArrowUp
            className="p-2 bg-ueventContrast rounded-full"
            onClick={() => setHide(false)}
            size={35}
          />
        ) : (
          <BsArrowDown
            className="p-2 bg-ueventContrast rounded-full"
            onClick={() => setHide(true)}
            size={35}
          />
        )}
      </div>

      <AnimatePresence initial={false}>
        {!hide && (
          <motion.div
            className="flex flex-col gap-5"
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <input
              placeholder="Search categories"
              onChange={(e) => setSearch(e.target.value)}
              className="bg-ueventSecondary p-2 text-sm rounded-xl w-full"
            />
            <div className="flex flex-col gap-2 overflow-auto pr-5 overflow-x-hidden h-[50vh] md:h-[100vh]">
              {filtered.map((tag, key) => (
                <div
                  onClick={onTagClick}
                  id={tag}
                  className={` text-base hover:border-b-2 w-fit p-1 border-ueventContrast cursor-pointer ${
                    chosen?.includes(tag)
                      ? "bg-ueventContrast w-full rounded-xl text-ueventBg font-semibold hover:text-ueventBg"
                      : "text-ueventText bg-ueventBg hover:text-ueventContrast"
                  }`}
                  key={key}
                >
                  {tag}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col gap-5 z-50 text-ueventText">
        <span>Type of event</span>
        <div className="flex items-center gap-2">
          <Radio
            onChange={() => setEventType("online")}
            id="eventOnline"
            name="eventType"
            value="online"
          />
          <Label htmlFor="eventOnline">online</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            onChange={() => setEventType("offline")}
            id="eventOffline"
            name="eventType"
            value="offline"
          />
          <Label htmlFor="eventOffline">offline</Label>
        </div>
      </div>
    </div>
  );
}
