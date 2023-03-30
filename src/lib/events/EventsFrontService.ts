import { Tag } from "@/components/defaults/Inputs/TagInput";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

export type EventData = {
  name: string;
  description: string;
  eventImages: string[] | Blob[] | null;
  startAt: string;
  endAt: string;
  cost: Cost;
  tickets: number;
  location: JSON;
  tags: Tag[];
}

export type Cost = {
  amount: number;
  currency: Currency;
}

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  UAH = "UAH"
}

export type  EventFrontServiceParams = {
  eventData: EventData;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setEventData: Dispatch<SetStateAction<EventData>>;
  filesDataURL: string[] | null;
}

export default class EventFrontService {
  static eventImageId = "eventImage";
  static imageMimeType = /image\/(png|jpg|jpeg)/i;

  eventData: EventData;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setEventData: Dispatch<SetStateAction<EventData>>;
  filesDataURL: string[] | null;

  constructor({
    eventData,
    setLoading,
    setEventData,
    filesDataURL
  }: EventFrontServiceParams) {
    this.eventData = eventData;
    this.setLoading = setLoading;
    this.setEventData = setEventData;
    this.filesDataURL = filesDataURL;
  }

  createHandleFormSubmit(type: "create" | "update") {
    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const eventForm = new FormData();

      eventForm.append("name", this.eventData.name);
      eventForm.append("description", this.eventData.description);

      if(this.eventData.eventImages)
        this.eventData.eventImages.forEach(image => {
          eventForm.append(EventFrontService.eventImageId, image);
        });
      
        eventForm.append("cost[amount]", this.eventData.cost.amount.toString());
      eventForm.append("cost[currency]", this.eventData.cost.currency);

      eventForm.append("startAt", this.eventData.startAt);
      eventForm.append("duration", (new Date(this.eventData.endAt).getTime() - new Date(this.eventData.startAt).getTime()).toString());
      eventForm.append("tickets", this.eventData.tickets.toString());
      eventForm.append("location", JSON.stringify(this.eventData.location));
      
      // @ts-ignore
      this.eventData.tags.forEach(tag => {
        // @ts-ignore
        eventForm.append('tags[]', tag);
      });
      this.setLoading(true);

      const response = await fetch(`/api/events/${type}`, {
        method: 'POST',
        body: eventForm,
      });

      this.setLoading(false);

      if(response.ok) {
        const event = await response.json();
        console.log(`${type}d event`, event);
      } else {
        console.error(`Failed to ${type} event:`, response.status, response.statusText);
      }
    };
    return handleFormSubmit;
  }

  createHandleEventDataChange() {
    const eventData = this.eventData;
    const handleEventDataChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | {target: {id: string, value: Tag[] | File[] | number}}) => {
      if(event.target.id === EventFrontService.eventImageId) {
        // @ts-ignore
        const images = event.target.value;
        // @ts-ignore
        if(!images[0].type.match(EventFrontService.imageMimeType)) {
          alert("Image mime type is not valid");
          return;
        }

        this.setEventData({...eventData, [EventFrontService.eventImageId]: images});
        
      } else if(event.target.id === 'cost') {
        // @ts-ignore
        if(event.target.value in Currency) 
          this.setEventData({...eventData, "cost": {...eventData.cost, "currency": event.target.value as Currency}});
        else
          this.setEventData({...eventData, "cost": {...eventData.cost, "amount": event.target.value as number}});
      } else {
        this.setEventData({...eventData, [event.target.id]: event.target.value});
        console.log(event.target.id, event.target.value);
      }
    }
    return handleEventDataChange;
  }


createGeneratePreviewEvent() {
  const eventData = this.eventData;
  const fileDataURL = this.filesDataURL;

  const generatePreviewEvent = () => {
    return {
      name: eventData.name,
      description: eventData.description,
      image: fileDataURL || "",
      startAt: eventData.startAt || "",
      cost: eventData.cost,
      tickets: eventData.tickets,
      location: eventData.location,
      tags: eventData.tags,
      organization: "",
      organizationId: "",  
    }
  }
  return generatePreviewEvent;
  }
}
