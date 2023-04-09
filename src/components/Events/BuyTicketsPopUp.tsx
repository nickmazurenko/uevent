import { EventData } from "@/lib/events/EventsFrontService";
import Modal from "../defaults/Modal/Modal";
import Dinero from "dinero.js";
import { ChangeEvent, useEffect, useState } from "react";
import PayPalButton from './PayPalButton';

export type Props = {
    onClose: () => void,
    amountOfTicketsLeft?: number,
    event: EventData,
    eventId: string
}

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

    let ticketCost = Dinero({ amount: props.event.cost.amount * 100, currency: props.event.cost.currency });

    const getAmountOfTicketsLeft = () => {
        if (props.amountOfTicketsLeft !== undefined) {
            return (
                <div>
                    <span>
                        Amount of tickets left:
                    </span>
                    <span>
                        {props.amountOfTicketsLeft}
                    </span>
                </div>
            )
        }
        return null;
    }

    const [countOfTickets, setCountOfTickets] = useState(1);

    const onCountOfTicketsChange = (e: ChangeEvent<HTMLInputElement>) => {
        let count = Math.floor(Number(e.target.value));

        setCountOfTickets(count);
    }

    const [ticketsCost, setTicketsCost] = useState(Dinero({ amount: ticketCost.getAmount() * countOfTickets, currency: props.event.cost.currency }));

    useEffect(() => {

        setTicketsCost(Dinero({ amount: ticketCost.getAmount() * countOfTickets, currency: props.event.cost.currency }));

    }, [countOfTickets])

    return (
        <Modal onClose={props.onClose} headerText="Buy ticket"  >
            <div className="flex justify-between items-center">

                <div>
                    <span>Ticket cost: </span>
                    <span>{ticketCost.toFormat("0.00")}</span>
                </div>

                {getAmountOfTicketsLeft()}

                <div>
                    <span>Count: </span>
                    <input type="number" value={countOfTickets} onChange={onCountOfTicketsChange}></input>
                </div>

                <div>
                    <span>Cost(with PayPal fee): </span>
                    <span>{calcDineroPayPalFee(ticketsCost.getAmount()).toFormat("0.00")}</span>
                </div>

                <div>
                    <PayPalButton eventId={props.eventId} ticketsCount={countOfTickets}></PayPalButton>
                </div>

            </div>
        </Modal>
    )

}

export default BuyTicketsPopUp;