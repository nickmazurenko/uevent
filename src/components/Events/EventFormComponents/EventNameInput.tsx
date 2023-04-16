import { ChangeEventHandler } from "react";
type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export default function EventNameInput({value, onChange}: Props) {
  return (
    <div className="flex flex-col items-center w-full mb-6">
      <label
        htmlFor="name"
        className="block mb-2 text-sm font-medium text-ueventText"
      >
        Name
      </label>
      <input
        type="text"
        id="name"
        value={value}
        placeholder="e.g. Charity 5K Run"
        onChange={onChange}
        className="p-2 bg-transparent border-0 w-full text-center border-b-2 border-ueventContrast text-ueventText "
      />
    </div>
  );
}
