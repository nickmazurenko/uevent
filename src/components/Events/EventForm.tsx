import { ChangeEventHandler, FormEventHandler, memo, useMemo } from "react";
import Button from "../defaults/Buttons/Button";
import Spinner from "../defaults/Spinner";
import { EventData } from "@/lib/events/EventsFrontService";

import EventNameInput from "./EventFormComponents/EventNameInput";
import EventDescriptionInput from "./EventFormComponents/EventDescriptionInput";
import EventTicketAndCostInput from "./EventFormComponents/EventTicketAndCostInput";
import EventTagInput from "./EventFormComponents/EventTagInput";
import EventImageInput from "./EventFormComponents/EventImageInput";
import EventStartAndEndInput from "./EventFormComponents/EventStartAndEndInput";

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
  eventData,
  onDataChange,
  imageId,
  formType,
  loading,
}: Props) {
  const event = useMemo(() => eventData, [eventData]);
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center w-full">
      <EventNameInput value={event.name} onChange={onDataChange} />

      <EventDescriptionInput
        value={event.description}
        onChange={onDataChange}
      />

      <EventStartAndEndInput
        startAt={event.startAt}
        endAt={event.endAt}
        onChange={onDataChange}
      />

      <EventTicketAndCostInput
        tickets={event.tickets}
        cost={event.cost}
        onChange={onDataChange}
      />

      <EventTagInput value={event.tags} onChange={onDataChange} />

      <EventImageInput id={imageId} value={event.eventImages} onChange={onDataChange} />

      <Button
        text={formType == "create" ? "Create new event" : "Update Event"}
        type="submit"
        isLoading={loading}
        loadingComponent={<Spinner />}
        additionalClasses="w-1/2"
      />
    </form>
  );
}

export default memo(EventForm);
