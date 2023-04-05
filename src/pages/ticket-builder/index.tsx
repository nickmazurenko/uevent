import TicketBuilder from "@/components/TicketBuilder/TicketBuilder";
import TicketBuilderContextWrapper from "@/components/TicketBuilder/TicketBuilderContext";
import RenderComponents from "@/components/TicketBuilder/TicketForm/RenderComponents";
import TicketForm from "@/components/TicketBuilder/TicketForm/TicketForm";
import TicketView from "@/components/TicketBuilder/TicketForm/TicketView";

export default function TicketBuilderPage() {

    return (
        <TicketBuilderContextWrapper>
            <TicketBuilder></TicketBuilder>
        </TicketBuilderContextWrapper>
    )

}