import { ChangeEventHandler, MouseEventHandler, useContext, useEffect, useState } from "react";
import { TicketBuilderContext } from "../TicketBuilderContext";
import { Text, Image, RenderComponent } from "../CanvasRenderer";
import NumberInput from "../Inputs/NumberInput";
import Vector2 from "../CanvasRenderer/Vector2";
import TextInput from "../Inputs/TextInput";

function RCParams({ rc }: { rc: RenderComponent }) {

    const { rcService, selectedComponent } = useContext(TicketBuilderContext);

    const [form, setForm] = useState({
        position: new Vector2(rc.position.x, rc.position.y),
        size: rc.size ? new Vector2(rc.size.x, rc.size.y) : new Vector2(0, 0)
    });

    useEffect(() => {

        if (selectedComponent) {
            setForm({ position: rc.position, size: rc.size ? rc.size : new Vector2() })
        }

    }, [selectedComponent])

    const onParamsChange: ChangeEventHandler<HTMLInputElement> = (e) => {

        const targetId = e.target.id;

        if (targetId === 'positionX' || targetId === 'positionY') {
            const value = Number(e.target.value);
            const newPos = targetId === "positionX"
                ?
                new Vector2(value, form.position.y)
                :
                new Vector2(form.position.x, value);

            setForm({ ...form, position: newPos });
        }

        if (targetId === 'sizeX' || targetId === 'sizeY') {
            const value = Number(e.target.value);
            const newSize = targetId === "sizeX"
                ?
                new Vector2(value, form.size.y)
                :
                new Vector2(form.size.x, value);

            setForm({ ...form, size: newSize });
        }

    }

    useEffect(() => {

        if (rcService) {
            rc.position = form.position;
            rc.size = form.size;

            rcService.updateRC(rc);
        }


    }, [form.position, form.size]);



    return (
        <div id="renderComponentParams">
            <div>

                <p>Position: </p>
                <NumberInput inputId="positionX" label="X: " onChange={onParamsChange} value={form.position.x}></NumberInput>
                <NumberInput inputId="positionY" label="Y: " onChange={onParamsChange} value={form.position.y}></NumberInput>
                <p>Size: </p>
                <NumberInput inputId="sizeX" label="X: " onChange={onParamsChange} value={form.size.x}></NumberInput>
                <NumberInput inputId="sizeY" label="Y: " onChange={onParamsChange} value={form.size.y}></NumberInput>
            </div>

        </div>
    )


}

function TextParams({ rc }: { rc: Text }) {

    const { rcService, selectedComponent } = useContext(TicketBuilderContext);


    const [form, setForm] = useState({ text: rc.text, color: rc.color });

    useEffect(() => {
        if (selectedComponent) {
            setForm({ text: rc.text, color: rc.color  });
        }
    }, [selectedComponent])

    const onParamsChange: ChangeEventHandler<HTMLInputElement> = (e) => {

        const targetId = e.target.id;

        if (targetId === 'text') {
            setForm({ ...form, text: e.target.value });
        }

        if (targetId === 'color') {
            setForm({ ...form, color: e.target.value  })
        }

    }

    useEffect(() => {

        rc.text = form.text;
        rc.color = form.color;

        rcService.updateRC(rc);

    }, [form.text, form.color]);


    return (
        <div>
            <RCParams rc={rc}></RCParams>
            <div>
                <TextInput inputId="text" label="Text: " value={form.text} onChange={onParamsChange} ></TextInput>
            </div>
            <div>
                <TextInput inputId="color" label="Color: " value={form.color} onChange={onParamsChange} ></TextInput>
            </div>
        </div>
    )
}

function ImageParams({ rc }: { rc: Image }) {

    return (
        <div>
            <RCParams rc={rc}></RCParams>
        </div>
    )



}

export default function RenderComponentParams() {

    const { selectedComponent, setSelectedComponent } = useContext(TicketBuilderContext);

    const onCloseClick: MouseEventHandler<HTMLButtonElement> = () => {
        setSelectedComponent && setSelectedComponent(null);
    }

    return (
        <div className="w-[25%]">
            <div>
                <span className="p-2">Parameters</span>
                <button className="p-2" onClick={onCloseClick}>X</button>
            </div>
            {
                (() => {
                    if (selectedComponent instanceof Text) {
                        return <TextParams rc={selectedComponent}></TextParams>
                    }
                    if (selectedComponent instanceof Image) {
                        return <ImageParams rc={selectedComponent}></ImageParams>
                    }
                    return null;
                })()
            }
        </div>
    )


}