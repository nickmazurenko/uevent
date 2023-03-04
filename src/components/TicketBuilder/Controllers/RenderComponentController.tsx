import { MouseEventHandler, useContext } from "react";
import { RenderComponent, Text, Image } from "../CanvasRenderer";
import { TicketBuilderContext } from "../TicketBuilderContext";

export type ControllerData = {
    name: string
}

export type Props = {
    controllerData: ControllerData
    rc: RenderComponent
}

export default function RenderComponentController({controllerData, rc}: Props) {

    const { rcService } = useContext(TicketBuilderContext);

    const onDeleteComponentClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        rcService?.deleteRC(rc);
    }

    return (
        <div className="p-2 hover:bg-cyan-400">
            <span>{ controllerData.name }</span>
            <div>
            <button className="p-2" onClick={onDeleteComponentClick}>Delete</button>
            </div>
        </div>
    )

}