import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react";
import Button from "../defaults/Buttons/Button";
import EventFrontService, {
  Currency,
  EventData,
} from "@/lib/events/EventsFrontService";
import EventForm from "./EventForm";
import Event from "./Event";
import { Tabs, TabsRef } from "flowbite-react";
import TicketBuilder from "../TicketBuilder/TicketBuilder";
import TicketBuilderContextWrapper from "../TicketBuilder/TicketBuilderContext";
import EventDataContext, { EventDataContextWrapper } from "./EventDataContext";
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

  const tabsRef = useRef<TabsRef>(null);
  const openTicketBuilderTab = () => {
    tabsRef.current?.setActiveTab(2);
  }

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


  const [ticketViewId, setTicketViewId] = useState<string | null>(null);

  const handleFormSubmit = service.createHandleFormSubmit("create", (ticketViewId) => {
    console.log("TicketViewID: " + ticketViewId);
    setTicketViewId(ticketViewId);
  });

  const eventDataContext = useContext(EventDataContext);


  return (
    <div className="flex flex-col items-center w-full gap-6">
      <Tabs.Group
        className="w-full flex self-center items-center justify-center z-50"
        ref={tabsRef}>
        <Tabs.Item title="Create Event">
          <EventForm
            onSubmit={handleFormSubmit}
            // @ts-ignore
            onDataChange={handleEventDataChange}
            loading={loading}
            imageId={eventImageId}
            eventData={eventData}
            formType="create"
            openTicketBuilderTab={openTicketBuilderTab}
          />
        </Tabs.Item>
        <Tabs.Item title="Preview">
          <Event
            show={openPreview}
            onClose={() => setOpenPreview(false)}
            event={generatePreviewEvent()}
          />
        </Tabs.Item>
        <Tabs.Item title="Ticket builder" className="w-full">
          <TicketBuilderContextWrapper>
            <TicketBuilder {...{ handleFormSubmit, ticketViewId }}></TicketBuilder>
          </TicketBuilderContextWrapper>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
}
