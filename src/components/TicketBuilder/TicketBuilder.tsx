import { useContext } from "react";
import { TicketBuilderContext } from "./TicketBuilderContext";
import RenderComponentParams from "./TicketForm/RenderComponentParams";
import RenderComponents from "./TicketForm/RenderComponents";
import TicketForm from "./TicketForm/TicketForm";
import TicketView from "./TicketForm/TicketView";

export default function TicketBuilder() {

    const { selectedComponent } = useContext(TicketBuilderContext);

    return (
        <div className="flex">
            <RenderComponents></RenderComponents>
            <TicketView></TicketView>
            {
                selectedComponent
                    ?
                    <RenderComponentParams></RenderComponentParams>
                    :
                    <TicketForm></TicketForm>
            }
        </div>
    )
}