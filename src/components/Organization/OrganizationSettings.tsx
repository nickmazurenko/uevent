import { MouseEventHandler, useState } from "react";
import Button from "../defaults/Buttons/Button";
import RedButton from "../defaults/Buttons/RedButton";
import Spinner from "../defaults/Spinner";
import { useRouter } from "next/router";

export default function OrganizationSettings() {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDeleteClick: MouseEventHandler<HTMLButtonElement>  = async (e) => {
        setLoading(true);

        await fetch("/api/organizations/delete", {
            method: "POST",
        });

        setLoading(false);

        location.reload();
        
    }

    const handleUpdateClick: MouseEventHandler<HTMLButtonElement> =async (e) => {
        router.push("/organizations/update");
    }

    return (
        <div>
            <Button text="Update" onClick={handleUpdateClick} />
            <RedButton text="Delete" onClick={handleDeleteClick} isLoading={loading} loadingComponent={<Spinner/>}></RedButton>
        </div>
    )

}