import {
  ChangeEventHandler,
  FormEventHandler,
  memo,
  useMemo,
  useState,
} from "react";
import Button from "../defaults/Buttons/Button";
import Spinner from "../defaults/Spinner";
import { EventData } from "@/lib/events/EventsFrontService";

import EventNameInput from "./EventFormComponents/EventNameInput";
import EventDescriptionInput from "./EventFormComponents/EventDescriptionInput";
import EventTicketAndCostInput from "./EventFormComponents/EventTicketAndCostInput";
import EventTagInput from "./EventFormComponents/EventTagInput";
import EventImageInput from "./EventFormComponents/EventImageInput";
import EventStartAndEndInput from "./EventFormComponents/EventStartAndEndInput";
import LocationTypeInput from "./EventFormComponents/EventLocationTypeInput";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { useRouter } from "next/router";

export type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  eventData: EventData;
  onDataChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  imageId: string;
  loading: boolean;
  formType: "create" | "update";
};

function EventForm({
  onSubmit,
  eventData: event,
  onDataChange,
  imageId,
  formType,
  loading,
}: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const submitEvent = (e) => {
    onSubmit(e);
    if (!loading) {
      router.push("/events");
    }
  };

  function handleNext(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setCurrentStep((prev) => prev + 1);
  }

  function handleBack(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setCurrentStep((prev) => prev - 1);
  }

  const form = [
    <>
      <div className="flex flex-row items-center max-w-2xl md:max-w-1/2 gap-4 justify-center p-4 bg-ueventContrast rounded-xl text-ueventText text-sm">
        <BsFillInfoSquareFill size={40} />
        <span>
          Please enter a short, descriptive name for your event that will help
          attendees remember and identify it.
        </span>
      </div>
      <EventNameInput value={event.name} onChange={onDataChange} />
    </>,
    <>
      <div className="flex flex-row items-center max-w-2xl md:max-w-1/2 gap-4 justify-center p-4 bg-ueventContrast rounded-xl text-ueventText text-sm">
        <BsFillInfoSquareFill size={40} />
        <span>
          Please provide a brief description of your event, highlighting its
          benefits and any special features that make it unique.
        </span>
      </div>
      <EventDescriptionInput
        value={event.description}
        onChange={onDataChange}
      />
    </>,
    <>
      <div className="flex flex-row items-center gap-4 max-w-2xl md:max-w-1/2 justify-center p-4 bg-ueventContrast rounded-xl text-ueventText text-sm">
        <BsFillInfoSquareFill size={40} />
        <span>
          Please enter the date and time that your event will start and end.
          This will help attendees know exactly when your event begins and ends.
        </span>
      </div>
      <EventStartAndEndInput
        startAt={event.startAt}
        endAt={event.endAt}
        onChange={onDataChange}
      />
    </>,
    <>
      <div className="flex flex-row items-center gap-4 max-w-2xl md:max-w-1/2 justify-center p-4 bg-ueventContrast rounded-xl text-ueventText text-sm">
        <BsFillInfoSquareFill size={40} />
        <span>
          Please enter the number of tickets you would like to make available
          for this event, as well as the cost per ticket. This will help
          attendees understand the availability and pricing of your event.
        </span>
      </div>
      <EventTicketAndCostInput
        tickets={event.tickets}
        cost={event.cost}
        onChange={onDataChange}
      />
    </>,
    <>
      <div className="flex flex-row items-center gap-4 max-w-2xl md:max-w-1/2 justify-center p-4 bg-ueventContrast rounded-xl text-ueventText text-sm">
        <BsFillInfoSquareFill size={40} />
        <span>
          Please enter a few descriptive tags for your event. These tags will
          help attendees find your event when searching for events of a similar
          nature.
        </span>
      </div>
      <EventTagInput value={event.tags} onChange={onDataChange} />
    </>,
    <>
      <div className="flex flex-row items-center gap-4 max-w-2xl md:max-w-1/2 justify-center p-4 bg-ueventContrast rounded-xl text-ueventText text-sm">
        <BsFillInfoSquareFill size={40} />
        <span>
          Please provide any images you have for your event. This will help
          attendees visualize your event and make it more enticing.
        </span>
      </div>
      <EventImageInput
        id={imageId}
        value={event.eventImages as string[]}
        onChange={onDataChange}
      />
    </>,
    <>
      <div className="flex flex-row items-center gap-4 max-w-2xl md:max-w-1/2 justify-center p-4 bg-ueventContrast rounded-xl text-ueventText text-sm">
        <BsFillInfoSquareFill size={40} />
        <span>
          Please provide the location of your event. This could be a link to an
          online event or a physical address. Providing clear location
          information will help attendees know how to access your event.
        </span>
      </div>
      <LocationTypeInput onChange={onDataChange} />
    </>,
  ];

  return (
    <form
      onSubmit={submitEvent}
      className="flex flex-col items-center gap-5 h-full w-full"
    >
      <div className="min-h-[20vw] flex items-center justify-center flex-col gap-10">
        {form[currentStep]}
      </div>
      <div className="flex flex-row w-full items-center justify-center gap-5">
        {currentStep > 0 && (
          <button
            className="px-4 py-2 bg-ueventContrast rounded-lg text-white"
            onClick={handleBack}
          >
            Back
          </button>
        )}
        {currentStep < form.length - 1 ? (
          <button
            className="px-4 py-2 bg-ueventContrast rounded-lg text-white"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <Button
            text={formType == "create" ? "Create new event" : "Update Event"}
            type="submit"
            isLoading={loading}
            loadingComponent={<Spinner />}
            additionalClasses="w-1/2"
          />
        )}
      </div>
    </form>
  );
}

// export default memo(EventForm);
export default EventForm;
