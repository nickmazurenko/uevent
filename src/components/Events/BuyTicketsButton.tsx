import { useState } from "react";
import Button from "../defaults/Buttons/Button"
import BuyTicketsPopUp from "./BuyTicketsPopUp";
import { EventData } from "@/lib/events/EventsFrontService";

export type Props = {
    event: EventData,
    eventId: string
}

const BuyTicketsButton = (props: Props) => {

    const [buyTicketsClicked, setBuyTicketsClicked] = useState(false);

    const handle = async () => {

        // open ticket popup with pay pal button
        setBuyTicketsClicked(true);
    }

    const closePopUp = () => {
        setBuyTicketsClicked(false);
    }

    const buyTicketsPopup = () => {
        if (buyTicketsClicked) {
            return (
                <BuyTicketsPopUp onClose={closePopUp} event={props.event} eventId={props.eventId} />
            )
        }
        return null;
    }

    return (
        <div>
            {buyTicketsPopup()}
            < Button text="Buy ticket" onClick={handle} />
        </div>

    )
}

export default BuyTicketsButton;