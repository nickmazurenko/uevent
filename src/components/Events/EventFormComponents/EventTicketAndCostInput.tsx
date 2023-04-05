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
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Tickets
        </label>
        <input
          id="tickets"
          type="number"
          value={tickets}
          min="1"
          onChange={onChange}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col items-center w-full mb-6 relative">
        <label
          htmlFor="cost"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Cost
        </label>
        <div className="flex flex-row">
        <input
          id="cost"
          value={cost.amount}
          onChange={onChange}
          className="text-center rounded-r-none w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          step="0.01"
          min="0"
        />
        <select id="cost" value={cost.currency} onChange={onChange} className="text-sm rounded-lg rounded-l-none border-none block p-2.5 bg-gray-700 placeholder-gray-400 text-white">
          <option>USD</option>
          <option>EUR</option>
          <option>UAH</option>
        </select>
        </div>
      </div>
    </div>
  );
}
