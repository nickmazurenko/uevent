import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import "react-datetime-picker/dist/DateTimePicker.css";
import { ChangeEvent } from "react";

type Props = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  value: string;
};

export default function DateTimeInput(props: Props) {
  return (
    <DateTimePicker
      onChange={(dateTime: string) => {
        props.handleChange({ target: { id: props.id, value: dateTime } });
      }}
      className="rounded-md bg-gray-700 text-white p-1 w-full text-center"
      calendarClassName="w-full bg-gray-700 text-white rounded-lg p-4 shadow-lg"
      disableClock={false}
      showLeadingZeros={true}
      {...props}
      locale="uk"
      timeZone="Europe/Kiev"
    />
  );
}
