import { FormEvent, useContext } from "react";
import { TicketBuilderContext } from "./TicketBuilderContext";
import RenderComponentParams from "./TicketForm/RenderComponentParams";
import RenderComponents from "./TicketForm/RenderComponents";
import TicketForm from "./TicketForm/TicketForm";
import TicketView from "./TicketForm/TicketView";
import EventDataContext from "../Events/EventDataContext";

export default function TicketBuilder({ handleFormSubmit }: { handleFormSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void> }) {

    const { selectedComponent } = useContext(TicketBuilderContext);
    const { eventData } = useContext(EventDataContext);

    return (
        <div className="flex text-[#ADA7A7] w-full justify-between">
            <RenderComponents></RenderComponents>
            <TicketView></TicketView>
            {
                selectedComponent
                    ?
                    <RenderComponentParams></RenderComponentParams>
                    :
                    <TicketForm {...{handleFormSubmit}}></TicketForm>
            }
        </div>
    )
}