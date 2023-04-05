import { TextInput } from "flowbite-react";
import { ChangeEventHandler, useContext, useEffect, useState } from "react";
import Vector2 from "../CanvasRenderer/Vector2";
import CheckboxInput from "../Inputs/CheckboxInput";
import NumberInput from "../Inputs/NumberInput";
import SelectInput from "../Inputs/SelectInput";
import { TicketBuilderContext } from "../TicketBuilderContext";
import TicketData from "../TicketData";





function Room({ room, onDelete }: { room: RoomData, onDelete: MouseEventHandler<HTMLButtonElement> }) {

    return (
        <div>
            <h3>{room.name}</h3>
            <button onClick={onDelete}>Delete</button>
        </div>
    )
}

function saveForm(form, rooms) {

    localStorage.setItem("TicketBuilderForm", JSON.stringify({ form, rooms }));

}

function loadForm() {

    return JSON.parse(localStorage.getItem("TicketBuilderForm"));

}

const ticketForm = {
    "event": { type: "select", values: ["JS Weekend", "PHP Weekend"], label: "Event", valueFrom: "ticketData" },
    "cost": { type: "number", label: "Cost", valueFrom: "ticketData" },
    "isPlaces": { type: "checkbox", label: "Places", valueFrom: "formData" },
    "placesNumber": { type: "number", label: "Places Number", valueFrom: "ticketData" },
    // "isRooms": { type: "checkbox", label: "Rooms", valueFrom: "formData" },
    // "roomName": { type: "text", label: "Room name", valueFrom: "formData" }
    "ticketSizeX": { type: "number", label: "Ticket Width" },
    "ticketSizeY": { type: "number", label: "TicketHeight" }
}

export default function TicketForm() {

    const { ticketItems, setTicketItems, setTicketSize, ticketSize, rcService  } = useContext(TicketBuilderContext);

    const [form, setForm] = useState({ isPlaces: false, isRooms: false, isAddRoom: false, roomName: "", ticketSizeX: ticketSize.x, ticketSizeY: ticketSize.y});
    const [rooms, setRooms] = useState([]);
    const [places, setPlaces] = useState(0);

    const [ticketData, setTicketData] = useState(new TicketData({ rooms: [], places: 0, cost: 0 }));

    const [saveMode, setSaveMode] = useState(false);

    const ticketFormIds = Object.keys(ticketForm);

    useEffect(() => {
        // console.log(loadForm());
        const { form, rooms } = loadForm();

        setForm(form);
        setRooms(rooms || []);
        setSaveMode(true);

    }, []);

    useEffect(() => {
        if (saveMode)
            saveForm(form, rooms);
    }, [form, rooms]);

    const onFormChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {

        if (e.target.id === "isPlaces") {
            setForm({ ...form, isPlaces: !form.isPlaces });
            setTicketItems && setTicketItems({ ...ticketItems, isPlaces: form.isPlaces });
            return;
        }

        if (e.target.id === "event") {
            const select = e.target as HTMLSelectElement;
            // setTicketItems && setTicketItems({ ...ticketItems, eventName: select.value  });
            rcService?.eventSelected(select.value);

        }

        if (e.target.id === "ticketSizeX") {
            const value = Number(e.target.value);
            setForm({...form, ticketSizeX: value});
            setTicketSize && setTicketSize({...ticketSize, x: value});
        }

        if (e.target.id === "ticketSizeY") {
            const value = Number(e.target.value);
            setForm({...form, ticketSizeY: value});
            const newSize = new Vector2(ticketSize.x, value);
            setTicketSize && setTicketSize(newSize);
        }

    }

    return (
        <div className="w-[25%]" id="ticketForm">
            Ticket params
            <form>
                {
                    ticketFormIds.map((ticketFormId, idx) => {

                        const ticketFormInput = ticketForm[ticketFormId];

                        if (ticketFormId === "placesNumber" && form.isPlaces && !form.isRooms) {
                            return <NumberInput key={ticketFormId} inputId={ticketFormId} label={ticketFormInput.label} value={places} onChange={onFormChange}></NumberInput>
                        } else if (ticketFormId === "roomName" && form.isRooms) {
                            return <TextInput key={ticketFormId} inputId={ticketFormId} label={ticketFormInput.label} value={form.roomName} onChange={onFormChange}></TextInput>
                        } else {
                            if (ticketFormInput.type === "select") {
                                return <SelectInput key={ticketFormId} inputId={ticketFormId} label={ticketFormInput.label} values={ticketFormInput.values} onChange={onFormChange}></SelectInput>
                            } else if (ticketFormInput.type === "number") {
                                return <NumberInput key={ticketFormId} inputId={ticketFormId} label={ticketFormInput.label} value={form[ticketFormId]} onChange={onFormChange}></NumberInput>
                            } else if (ticketFormInput.type === "checkbox") {
                                return <CheckboxInput key={ticketFormId} inputId={ticketFormId} label={ticketFormInput.label} value={form[ticketFormId]} onChange={onFormChange}></CheckboxInput>
                            } else if (ticketFormInput.type === "text") {
                                return <TextInput key={ticketFormId} inputId={ticketFormId} label={ticketFormInput.label} value={form.roomName} onChange={onFormChange}></TextInput>
                            }

                        }

                        return null;
                    })
                }

            </form>

        </div>
    )
}