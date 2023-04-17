import { EventData } from "@/lib/events/EventsFrontService";
import Dinero from "dinero.js";
import { ChangeEvent, useEffect, useState } from "react";
import PayPalButton from "./PayPalButton";
import { Modal } from "flowbite-react";
import { ModalBody } from "flowbite-react/lib/esm/components/Modal/ModalBody";
import { AiOutlineClose } from "react-icons/ai";

export type Props = {
  onClose: () => void;
  amountOfTicketsLeft?: number;
  show: boolean;
  event: EventData;
  eventId: string;
};

const calcDineroPayPalFee = function (amount: number) {
  if (amount === 0) return Dinero({ amount: 0, currency: "USD" });

  let itemValue = Dinero({
    amount: amount,
    currency: "USD",
  });
  const defaultFee = Dinero({ amount: 48, currency: "USD" });
  const defaultPercentage = 4;

  itemValue = itemValue.add(defaultFee);

  const adderFee = itemValue.percentage(defaultPercentage);

  const value = itemValue.add(adderFee);

  return value;
};

const BuyTicketsPopUp = (props: Props) => {
  let ticketCost = Dinero({
    amount: props.event.cost.amount * 100,
    currency: props.event.cost.currency,
  });

  const getAmountOfTicketsLeft = () => {
    if (props.amountOfTicketsLeft !== undefined) {
      return (
        <div>
          <span>Amount of tickets left:</span>
          <span>{props.amountOfTicketsLeft}</span>
        </div>
      );
    }
    return null;
  };

  const [countOfTickets, setCountOfTickets] = useState(1);

  const onCountOfTicketsChange = (e: ChangeEvent<HTMLInputElement>) => {
    let count = Math.floor(Number(e.target.value));

    setCountOfTickets(count);
  };

  const [ticketsCost, setTicketsCost] = useState(
    Dinero({
      amount: ticketCost.getAmount() * countOfTickets,
      currency: props.event.cost.currency,
    })
  );

  useEffect(() => {
    setTicketsCost(
      Dinero({
        amount: ticketCost.getAmount() * countOfTickets,
        currency: props.event.cost.currency,
      })
    );
  }, [countOfTickets]);

  return (
    <Modal
      onClose={props.onClose}
      show={props.show}
      size="md"
      className="bg-ueventSecondary backdrop-blur-sm"
      dismissible={true}
    >
      <Modal.Body className="drop-shadow-2xl w-full flex flex-col justify-center items-center bg-ueventSecondary rounded-lg">
        <AiOutlineClose
          size={20}
          className="text-ueventText hover:text-ueventContrast cursor-pointer absolute top-5 right-5"
          onClick={props.onClose}
        />

        <h1 className="text-4xl py-20 text-ueventText">Buy Ticket</h1>

        <div className="flex flex-col w-full gap-10 text-ueventText justify-between items-center">
          <div className="w-full flex flex-row gap-5 items-center justify-between">
            <span>Ticket cost: </span>
            <span>
              {ticketCost.toFormat("0.00")} {props.event.cost.currency}
            </span>
          </div>

          {getAmountOfTicketsLeft()}

          <div className="w-full flex flex-row gap-5 items-center justify-between">
            <span>Number of tickets: </span>
            <input
              className="p-2 w-1/2 lg:w-1/4 bg-transparent border-0 border-b-2 border-ueventContrast text-center"
              type="number"
              value={countOfTickets}
              onChange={onCountOfTicketsChange}
            ></input>
          </div>

          <div>
            <span className="w-full">Cost(with PayPal fee): </span>
            <span className="text-ueventContrast text-xl">
              {calcDineroPayPalFee(ticketsCost.getAmount()).toFormat("0.00")}
            </span>
          </div>

          <div>
            <PayPalButton
              eventId={props.eventId}
              ticketsCount={countOfTickets}
            ></PayPalButton>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BuyTicketsPopUp;
