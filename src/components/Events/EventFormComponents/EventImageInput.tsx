import { ChangeEventHandler } from "react";
import ImageInput from "@/components/defaults/Inputs/ImageInput";

type Props = {
  id: string;
  value: string [];
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export default function EventImageInput({ id, value, onChange }: Props) {
  return (
    <div className="flex flex-col items-center w-full mb-6">
      <label
        htmlFor="imageInput"
        className="block mb-2 text-sm font-medium text-ueventText"
      >
        Event Images
      </label>
      <ImageInput id={id} value={value} onChange={onChange} />
    </div>
  );
}
