import { ChangeEventHandler, FormEventHandler } from "react";
import Button from "../defaults/Buttons/Button";
import Spinner from "../defaults/Spinner";
import TagInput from "../defaults/Inputs/TagInput";
import ImageInput from '../defaults/Inputs/ImageInput';
import { EventData } from "@/lib/events/EventsFrontService";

export type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  eventData: EventData;
  onDataChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  imageId: string;
  loading: boolean;
  formType: "create" | "update";
};

export default function EventForm(props: Props) {
  return (
    <form
      onSubmit={props.onSubmit}
      className="mb-6 flex flex-col items-center w-full"
    >
      <div className="flex flex-col items-center w-full mb-6">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={props.eventData.name}
          onChange={props.onDataChange}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="flex flex-col items-center w-full mb-6">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Description
        </label>
        <textarea
          rows={4}
          id="description"
          value={props.eventData.description}
          onChange={props.onDataChange}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
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
            value={props.eventData.tickets}
            onChange={props.onDataChange}
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
          <span className="absolute inset-y-9 left-0 flex text-gray-900 items-center text-xl p-2">
            $
          </span>
          <input
            id="cost"
            value={props.eventData.cost}
            onChange={props.onDataChange}
            className="block pl-8 w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            step="0.01"
            min="0"
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-full mb-6">
        <label
          htmlFor="tags"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Tags
        </label>
        <TagInput tags={props.eventData.tags} setTags={props.onDataChange} />
      </div>
      <div className="flex flex-col items-center w-full mb-6">
      <label htmlFor='imageInput' className="block mb-2 text-sm font-medium text-gray-900">Event Images</label>
      <ImageInput id={props.imageId} onChange={props.onDataChange} />
      </div>
      <Button
        text={props.formType == "create" ? "Create new event" : "Update Event"}
        type="submit"
        isLoading={props.loading}
        loadingComponent={<Spinner />}
        additionalClasses="w-1/2"
      />
    </form>
  );
}
