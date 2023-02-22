import { MouseEventHandler, useState } from "react";
import RedButton from "../defaults/Buttons/RedButton";
import Spinner from "../defaults/Spinner";

export default function OrganizationSettings() {

    const [loading, setLoading] = useState(false);

    const handleDeleteClick: MouseEventHandler<HTMLButtonElement>  = async (e) => {
        setLoading(true);

        await fetch("/api/organizations/delete", {
            method: "POST",
        });

        setLoading(false);

        location.reload();
        
    }

    return (
        <div>
            <RedButton text="Delete" onClick={handleDeleteClick} isLoading={loading} loadingComponent={<Spinner/>}></RedButton>
        </div>
    )

}