import { useState } from "react";
import Button from "../defaults/Buttons/Button";
import BuyTicketsPopUp from "./BuyTicketsPopUp";
import { EventData } from "@/lib/events/EventsFrontService";

export type Props = {
  event: EventData;
  eventId: string;
};

const BuyTicketsButton = (props: Props) => {
  const [buyTicketsClicked, setBuyTicketsClicked] = useState(false);

  const handle = async () => {
    // open ticket popup with pay pal button
    setBuyTicketsClicked(true);
  };

  const closePopUp = () => {
    setBuyTicketsClicked(false);
  };

  const buyTicketsPopup = () => {
    if (buyTicketsClicked) {
      return (
        <BuyTicketsPopUp
          onClose={closePopUp}
          show={buyTicketsClicked}
          event={props.event}
          eventId={props.eventId}
        />
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      {buyTicketsPopup()}
      <Button
        additionalClasses="w-full p-5"
        text="Buy Now !"
        onClick={handle}
      />
    </div>
  );
};

export default BuyTicketsButton;
