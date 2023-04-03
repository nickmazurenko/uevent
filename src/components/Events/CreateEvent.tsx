import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../defaults/Buttons/Button";
import EventFrontService, {
  Currency,
  EventData,
} from "@/lib/events/EventsFrontService";
import EventForm from "./EventForm";
import Event from "./Event";
import { Tabs } from "flowbite-react";
const eventImageId = "eventImages";

export default function CreateEvent() {
  const [eventData, setEventData] = useState<EventData>({
    name: "",
    description: "",
    startAt: "",
    endAt: "",
    [eventImageId]: [],
    cost: { amount: 0, currency: Currency.USD },
    tickets: 0,
    location: JSON,
    tags: [],
  });

  const [filesDataURL, setFilesDataURL] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);

  const service = new EventFrontService({
    eventData,
    setLoading,
    setEventData,
    filesDataURL,
  });

  const generatePreviewEvent = service.createGeneratePreviewEvent();
  const handleEventDataChange = service.createHandleEventDataChange();
  const eventImages = eventData[eventImageId];

  useEffect(() => {
    if (eventImages) {
      const urls = [];
      // Loop through the files and generate URLs for each image
      for (let i = 0; i < eventImages.length; i++) {
        const file = eventImages[i];
        const url = URL.createObjectURL(file);
        urls.push(url);
      }

      setFilesDataURL(urls);
    }
  }, [eventImages]);

  const handleFormSubmit = service.createHandleFormSubmit("create");

  return (
    <div className="flex flex-col items-center min-w-[35%] gap-6">
      <h1 className="text-white mb-6">Create a new Event</h1>
      <Tabs.Group>
        <Tabs.Item title="Create Event">
          <EventForm
            onSubmit={handleFormSubmit}
            // @ts-ignore
            onDataChange={handleEventDataChange}
            loading={loading}
            imageId={eventImageId}
            eventData={eventData}
            formType="create"
          />
        </Tabs.Item>
        <Tabs.Item title="Preview">
          <Event
            show={openPreview}
            onClose={() => setOpenPreview(false)}
            event={generatePreviewEvent()}
          />
        </Tabs.Item>
      </Tabs.Group>
      <Button
        text="open preview"
        onClick={() => setOpenPreview(!openPreview)}
      />
    </div>
  );
}
