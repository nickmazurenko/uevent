import { Organization as Org } from "@prisma/client";
import { useSession } from "next-auth/react";
import { MouseEventHandler, useEffect, useState } from "react";
import OrganizationSettings from "./OrganizationSettings";
import Tabs, {TabData} from "./Tabs";
import EventList from "../Events/EventList";

const defaultTabs: TabData[] = [
    { selected: true, text: "Events" },
    { selected: false, text: "News" },
    { selected: false, text: "Settings" },
] 

export type Props = {
    organization: Org
}

export default function Organization({ organization }: Props) {

    const {data: session} = useSession();
    const user = session?.user;

    const [tabs, setTabs] = useState(defaultTabs);

    const handleTabSelect: MouseEventHandler<HTMLSpanElement> = (e) => {
        const clickedId = e.target.id;

        const tabsCopy = [...tabs];
        tabsCopy.forEach((tab) => {
            if (tab.text === clickedId) tab.selected = true;
            else tab.selected = false;  
        });

        setTabs(tabsCopy);

    }

    const selectPage = () => {
        const selectedPage = tabs.find((tab) => tab.selected);

        switch (selectedPage?.text) {
            case "Events":
                return <div><EventList events={organization?.events} /></div>
            case "News":
                return <div></div>
            case "Settings":
                return <OrganizationSettings />
        }
    }

    useEffect(() => {
        console.log(organization);
        if (organization?.owner?.email == user?.email && tabs.length < 3) {
            setTabs([...tabs, { selected: false, text: "Settings" }]);
        };

    }, [session?.user]);

    return (
        <div className="Organization text-white w-full text-center flex flex-col content-center">

            <div id="organization-image" className="flex justify-center mb-6" >
                <img className="" src={organization.image}></img>
            </div>

            <div id="organization-name" className="mb-6">
                <h1 className="text-4xl">{organization.name}</h1>
            </div>

            <div id="organization-description" className="mb-6">
                <p>{organization.description}</p>
            </div>

            <div id="organization-data" className="flex justify-center">
                <Tabs tabs={tabs} handleSelect={handleTabSelect}></Tabs>
            </div>

            <div id="organization-data-page">
                {
                    selectPage()
                }
            </div>

        </div>
    )

}