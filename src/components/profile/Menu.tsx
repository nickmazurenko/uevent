import Link from "next/link";
import { useRouter } from "next/router";
import Organization from "../Organization/Organization";

const enum MenuOptions {
  general = "/profile",
  organization = "/profile/organization",
  tickets = "/profile/Tickets",
  events = "/profile/Events",
}

export default function Menu() {
  const router = useRouter();

  const getClassName = (option: MenuOptions) => {
    return router.asPath === option ? "text-ueventContrast" : "";
  };

  return (
    <div className="flex flex-col gap-5 px-4 text-ueventText">
      <Link className={getClassName(MenuOptions.general)} href="/profile">
        General
      </Link>
      <Link
        className={getClassName(MenuOptions.organization)}
        href="/profile/organization"
      >
        Organization
      </Link>
      <Link
        className={getClassName(MenuOptions.tickets)}
        href="/profile/Tickets"
      >
        Tickets
      </Link>
      <Link className={getClassName(MenuOptions.events)} href="/profile/events">
        Events
      </Link>
    </div>
  );
}
