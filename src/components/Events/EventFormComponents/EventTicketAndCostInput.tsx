import { Cost } from "@/lib/events/EventsFrontService";
import { ChangeEventHandler } from "react";

type Props = {
  tickets: number;
  cost: Cost;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export default function EventTicketAndCostInput({
  tickets,
  cost,
  onChange,
}: Props) {
  return (
    <div className="flex flex-row justify-between items-center w-full gap-2">
      <div className="flex flex-col items-center w-full mb-6">
        <label
          htmlFor="tickets"
          className="block mb-2 text-sm font-medium text-ueventText"
        >
          Number of Tickets
        </label>
        <input
          id="tickets"
          type="number"
          value={tickets}
          min="1"
          onChange={onChange}
          className="p-2 text-ueventText border-0 border-b-2 border-ueventContrast bg-transparent w-full text-center"
        />
      </div>
      <div className="flex flex-col items-center w-full mb-6 relative">
        <label
          htmlFor="cost"
          className="block mb-2 text-sm font-medium text-ueventText"
        >
          Cost
        </label>
        <div className="flex flex-row">
          <input
            id="cost"
            value={cost.amount}
            onChange={onChange}
            className="p-2 text-ueventText border-0 border-b-2 border-ueventContrast bg-transparent w-full text-center"
            type="number"
            step="0.01"
            min="0"
          />
          <select
            id="cost"
            value={cost.currency}
            onChange={onChange}
            className="text-sm rounded-lg rounded-l-none border-none block p-2.5 bg-ueventContrast placeholder-ueventText text-ueventText appearance-none bg-transparent pl-4 pr-8"
          >
            <option className="p-2">USD</option>
            <option className="p-2">EUR</option>
            <option className="p-2">UAH</option>
          </select>
        </div>
      </div>
    </div>
  );
}
