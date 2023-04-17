import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import FileInput from "../defaults/Inputs/FileInput";
import Button from "../defaults/Buttons/Button";
import Spinner from "../defaults/Spinner";
import { useRouter } from "next/router";

export type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  organizationData: { name: string; description: string };
  onDataChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  imageId: string;
  loading: boolean;
  formType: "create" | "update";
};

export default function OrganizationForm(props: Props) {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (clicked && !props.loading) {
      router.reload();
    }
  }, [clicked, props.loading]);
  return (
    <form
      onSubmit={(data) => {
        props.onSubmit(data);
        setClicked(true);
      }}
      className="mb-6 flex flex-col items-center w-[100%]"
    >
      <div className="flex flex-col items-center w-full mb-6">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={props.organizationData.name}
          placeholder="Organization name..."
          onChange={props.onDataChange}
          className="w-full p-2 bg-transparent border-0 border-b-2 text-ueventText border-ueventContrast"
/>
      </div>

      <div className="flex flex-col items-center w-full mb-6">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <textarea
          id="description"
          value={props.organizationData.description}
          onChange={props.onDataChange}
          placeholder="Organization description..."
          rows={4}
          className="w-full p-2 border-0 bg-transparent text-ueventText border-b-2 border-ueventContrast"
        ></textarea>
      </div>

      <FileInput
        handleChange={props.onDataChange}
        id={props.imageId}
        description={"Organization image"}
      />

      <Button
        text={
          props.formType == "create"
            ? "Create"
            : "Update"
        }
        type="submit"
        isLoading={props.loading}
        loadingComponent={<Spinner></Spinner>}
        additionalClasses="w-[50%] "
      />
    </form>
  );
}
