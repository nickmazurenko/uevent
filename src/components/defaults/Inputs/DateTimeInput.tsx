import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
// import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import { ChangeEvent } from "react";
import { AiOutlineClear } from "react-icons/ai";

type Props = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  value: string;
  minDate?: string;
};

export default function DateTimeInput(props: Props) {
  return (
    <DateTimePicker
      onChange={(dateTime: string) => {
        props.handleChange({ target: { id: props.id, value: dateTime } });
      }}
      className="rounded-md border-2 border-ueventContrast bg-transparent text-white p-1 w-full text-center text-xl"
      calendarClassName="w-full bg-gray-700 text-white rounded-lg p-4 shadow-lg"
      disableClock={false}
      calendarIcon={false}
      clearIcon={<AiOutlineClear size={20} />}
      showLeadingZeros={true}
      {...props}
      locale="uk"
      timeZone="Europe/Kiev"
    />
  );
}
