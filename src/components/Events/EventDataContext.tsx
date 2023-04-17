import { EventData } from "@/lib/events/EventsFrontService";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export type EventDataContextType = {
    eventData: EventData | null,
    setEventData: Dispatch<SetStateAction<EventData | null>> | null
}

const EventDataContext = createContext<EventDataContextType>({
    eventData: null,
    setEventData: null
});

export const EventDataContextWrapper = ({ children }) => {

    const [eventData, setEventData] = useState<EventData | null>(null);

    return (
        <EventDataContext.Provider value={{ eventData, setEventData }}>
            {children}
        </EventDataContext.Provider>
    )
}

export default EventDataContext;