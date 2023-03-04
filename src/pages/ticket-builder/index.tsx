import TicketBuilderContextWrapper from "@/components/TicketBuilder/TicketBuilderContext";
import RenderComponents from "@/components/TicketBuilder/TicketForm/RenderComponents";
import TicketForm from "@/components/TicketBuilder/TicketForm/TicketForm";
import TicketView from "@/components/TicketBuilder/TicketForm/TicketView";

export default function TicketBuilderPage() {

    return (
        <TicketBuilderContextWrapper>
        <div className="flex">
            <RenderComponents></RenderComponents>
            <TicketView></TicketView>
            <TicketForm></TicketForm>
        </div>
        </TicketBuilderContextWrapper>
    )

}