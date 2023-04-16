import { Organization as Org } from "@prisma/client";
import { useSession } from "next-auth/react";
import { MouseEventHandler, useEffect, useState } from "react";
import OrganizationSettings from "./OrganizationSettings";
import Tabs, { TabData } from "./Tabs";
import Image from "next/image";
import moment from "moment";
import EventsList from "../eventspage/EventsList";
import CreateOrganization from "./CreateOrganization";
import NewsList from "./NewsList";

const defaultTabs: TabData[] = [
  { selected: true, text: "Events" },
  { selected: false, text: "News" },
  { selected: false, text: "Settings" },
];

export type Props = {
  organization: Org;
};

export default function Organization({ organization }: Props) {
  const { data: session } = useSession();
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
  };

  const selectPage = () => {
    const selectedPage = tabs.find((tab) => tab.selected);

    switch (selectedPage?.text) {
      case "Events":
        return (
          <div>
            <EventsList events={organization.events} />
          </div>
        );
      case "News":
        return <NewsList news={organization.news} />;
      case "Settings":
        return <OrganizationSettings />;
    }
  };

  useEffect(() => {
    if (organization?.owner?.email == user?.email && tabs.length < 3) {
      setTabs([...tabs, { selected: false, text: "Settings" }]);
    }
  }, [session?.user]);
  return (
    <div
      style={{ boxShadow: "0px 10px 16px 3px black" }}
      className="w-full h-full flex flex-col py-5 bg-ueventSecondary rounded-2xl gap-2 justify-center justify-items-center items-center"
    >
      {organization ? (
        <>
          <div className="text-ueventText flex flex-col w-full p-5 md:flex-row gap-5 justify-center items-start md:justify-between">
            <div className="flex flex-row gap-8 items-center justify-center w-full">
              <div className="flex flex-row gap-5 items-center">
                {organization.image && (
                  <Image
                    src={organization?.image as string}
                    className="rounded-full"
                    width="120"
                    height="120"
                    alt="avatar"
                  />
                )}
                <div className="flex flex-col w-full gap-2">
                  <span className="text-2xl">{organization?.name}</span>
                  <span className="text-xs text-gray-500">
                    {organization?.description}
                  </span>
                  <span className="text-xs text-gray-500">
                    Registered {moment(organization?.createdAt).fromNow()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Tabs tabs={tabs} handleSelect={handleTabSelect}></Tabs>
          <div className="w-full p-5 h-full" id="organization-data-page">
            {selectPage()}
          </div>
        </>
      ) : (
        <CreateOrganization />
      )}
    </div>
  );
}
