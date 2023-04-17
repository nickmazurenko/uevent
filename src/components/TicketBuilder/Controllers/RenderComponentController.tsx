import { MouseEventHandler, useContext } from "react";
import { RenderComponent, Text, Image } from "../CanvasRenderer";
import { TicketBuilderContext } from "../TicketBuilderContext";

export type ControllerData = {
    name: string
}

export type Props = {
    controllerData: ControllerData
    rc: RenderComponent,
    moveUp: () => void,
    moveDown: () => void
}

export default function RenderComponentController({ controllerData, rc, moveUp, moveDown }: Props) {

    const { rcService, setSelectedComponent } = useContext(TicketBuilderContext);

    const onDeleteComponentClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        console.log("delete");
        rcService?.deleteRC(rc);
    }

    const onSelectComponent: MouseEventHandler<HTMLDivElement> = (e) => {
        setSelectedComponent && setSelectedComponent(rc);
    }

    return (
        <div className="m-2 border-solid border-ticketBuilderBorder border-y-2 flex justify-between hover:bg-ticketBuilderHover" >
            <span className="hover:bg-cyan-400 cursor-pointer p-1 w-[50%]" onClick={onSelectComponent}>{controllerData.name}</span>
            <div>
                <button className="hover:bg-cyan-400 cursor-pointer p-1" onClick={() => moveUp()}>↑</button>
                <button className="hover:bg-cyan-400 cursor-pointer p-1" onClick={() => moveDown()}>↓</button>
                <button className="p-1 hover:bg-red-600" onClick={onDeleteComponentClick}>X</button>
            </div>

        </div>
    )

}