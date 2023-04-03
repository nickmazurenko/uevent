import { ChangeEventHandler } from "react";
import { Tag } from "../../defaults/Inputs/TagInput";
import TagInput from "../../defaults/Inputs/TagInput";
type Props = {
  value: Tag[];
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export default function EventTagInput({ value, onChange }: Props) {
  return (
    <div className="flex flex-col items-center w-full mb-6">
      <label
        htmlFor="tags"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Tags
      </label>
      <TagInput tags={value} setTags={onChange} />
    </div>
  );
}
