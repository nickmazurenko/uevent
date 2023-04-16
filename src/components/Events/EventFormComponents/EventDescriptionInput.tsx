import { ChangeEventHandler } from "react";
type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export default function EventDescriptionInput({ value, onChange }: Props) {
  return (
    <div className="flex flex-col items-center w-full mb-6">
      <label
        htmlFor="description"
        className="block mb-2 text-sm font-medium text-ueventText"
      >
        Description
      </label>
      <textarea
        rows={6}
        id="description"
        placeholder="A 5K race that raises money for a local non-profit organization. All participants can run, jog, or walk the course. Music, food, and fun activities included...."
        value={value}
        onChange={onChange}
        className="p-2 bg-transparent w-full border-ueventContrast text-ueventText rounded-xl"
      />
    </div>
  );
}
