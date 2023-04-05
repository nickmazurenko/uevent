import { TextInput, Radio, Label } from "flowbite-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, ChangeEventHandler, useEffect } from "react";
import EventLocationInput from "./EventLocationInput";

export default function LocationTypeInput({
  onChange,
}: {
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) {
  const [isOnline, setIsOnline] = useState<Boolean | null>(null);
  const [location, setLocation] = useState<Location>({
    link: "",
    place: {
      address: "",
      city: "",
      additional: "",
      postalCode: "",
      coordinates: { lat: 0, lng: 0 },
      country: "",
      state: "",
    },
  });
  const handleSelect = (value: string) => {
    setIsOnline(value === "online");
  };

  useEffect(() => {
    onChange({
      target: {
        id: "location",
        // @ts-ignore
        value: {
          ...(isOnline
            ? { type: "online", link: location.link }
            : { type: "offline", place: location.place }),
        },
      },
    });
  }, [location, isOnline]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <span>Please select event type</span>
      <fieldset className="flex flex-col gap-4" id="radio">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 text-black z-10">
            <Radio
              onClick={() => handleSelect("online")}
              name="type"
              id="online"
            />
            <Label color="black" htmlFor="online">
              Online
            </Label>
          </div>
          <AnimatePresence>
            {isOnline && (
              <motion.div
                transition={{ duration: 1 }}
                initial={{ opacity: 0, y: "-100%" }}
                animate={{ opacity: 1, y: "0" }}
                exit={{ opacity: 0, y: "-100%" }}
              >
                <TextInput
                  placeholder="Meeting link or invite link"
                  value={location.link}
                  onChange={(e) => {
                    setLocation({ ...location, link: e.target.value });
                  }}
                  className="w-full"
                  id="link"
                  required={true}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex gap-2 z-10">
            <Radio
              onClick={() => handleSelect("offline")}
              name="type"
              id="offline"
            />
            <Label color="black" htmlFor="offline">
              Offline
            </Label>
          </div>
        </div>
      </fieldset>
      <AnimatePresence>
        {isOnline === false && (
          <motion.div
            transition={{ duration: 1 }}
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0" }}
            exit={{ opacity: 0, y: "-100%" }}
          >
            <EventLocationInput location={location} setLocation={setLocation} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

export type Location = {
  link: string;
  place: LocationPlace;
};

export type LocationPlace = {
  coordinates: { lat: number; lng: number };
  address: string;
  additional?: string;
  city: string;
  country: string;
  state: string;
  postalCode?: string;
};

export type Place = {
  name: string;
  address_components: AddressComponent[];
  geometry: { location: { lat: Function; lng: Function } };
};
