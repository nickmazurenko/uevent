import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../defaults/Buttons/Button";
import EventFrontService, { EventData } from "@/lib/events/EventsFrontService";
import EventForm from "./EventForm";
const eventImageId = "eventImages";

export default function CreateEvent() {
  const [eventData, setEventData] = useState<EventData>({
    name: "",
    description: "",
    startAt: "",
    endAt: "",
    [eventImageId]: [],
    cost: 0,
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

  useEffect(() => {
    let fileReader: FileReader,
      isCancelled = false;

    if (eventData[eventImageId]) {
      const files = eventData[eventImageId];

      for (let i = 0; i < files.length; i++) {
        fileReader = new FileReader();
        fileReader.onload = (e) => {
          // @ts-ignore
          const { result } = e.target;
          if (result && !isCancelled) {
            setFilesDataURL((prevDataUrls: string[]) => [...prevDataUrls, result]);
          }
        };
        fileReader.readAsDataURL(files[i] as Blob);
      }
    }

    return () => {
      isCancelled = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [eventData[eventImageId]]);

  const handleFormSubmit = service.createHandleFormSubmit("create");

  return (
    <div className="flex flex-col items-center min-w-[35%]">
      <h1 className="text-white mb-6">Create a new Event</h1>
      <EventForm
        onSubmit={handleFormSubmit}
        // @ts-ignore
        onDataChange={handleEventDataChange}
        loading={loading}
        imageId={eventImageId}
        eventData={eventData}
        formType="create"
      />
      <Button
        text="open preview"
        onClick={() => setOpenPreview(!openPreview)}
      />
    </div>
  );
}
