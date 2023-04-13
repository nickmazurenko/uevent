import { MouseEventHandler, useState } from "react";
import Button from "../defaults/Buttons/Button";
import RedButton from "../defaults/Buttons/RedButton";
import Spinner from "../defaults/Spinner";
import { useRouter } from "next/router";

export default function OrganizationSettings() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeleteClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    setLoading(true);

    await fetch("/api/organizations/delete", {
      method: "POST",
    });

    setLoading(false);

    location.reload();
  };

  const handleUpdateClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    router.push("/organizations/update");
  };

  return (
    <div className="flex flex-col gap-5 p-10 rounded-2xl w-full">
      <button
        onClick={handleUpdateClick}
        className="w-full border-b-2 p-2 text-ueventText border-ueventContrast hover:bg-ueventContrast hover:rounded-xl"
      >
        Update Organization
      </button>
      <button
        onClick={handleDeleteClick}
        className="w-full border-b-2 p-2 text-ueventText border-red-800 hover:bg-ueventContrast hover:rounded-xl"
      >
        Delete Organization
      </button>
    </div>
  );
}
