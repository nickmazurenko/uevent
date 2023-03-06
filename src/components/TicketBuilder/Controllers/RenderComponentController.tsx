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

    const { rcService, setSelectedComponent } = useContext(TicketBuilderContext);

    const onDeleteComponentClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        console.log("delete");
        rcService?.deleteRC(rc);
    }

    const onSelectComponent: MouseEventHandler<HTMLDivElement> = (e) => {
        setSelectedComponent && setSelectedComponent(rc);
    }

    return (
        <div className="p-2 " >
            <span className="hover:bg-cyan-400 cursor-pointer p-2 w-[50%]" onClick={onSelectComponent}>{ controllerData.name }</span>
            <button className="p-2 hover:bg-red-600" onClick={onDeleteComponentClick}>Delete</button>
        </div>
    )

}