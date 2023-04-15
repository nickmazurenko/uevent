import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { HiMenu, HiSearch } from "react-icons/hi";
import { Navbar, Button, TextInput, Dropdown } from "flowbite-react";
import { useRouter } from "next/router";
import SignInModal from "./SignInModal";
import Image from "next/image";
import { User } from "@prisma/client";
import Organization from "./Organization/Organization";
import { useTranslations } from "next-intl";

const Header: React.FC = () => {
  const localStorage =
    typeof window !== "undefined" ? window.localStorage : null;
  const { data: session, status } = useSession();
  const t = useTranslations();
  const [show, setShow] = useState(false);
  const [locale, setLocale] = useState(t("locale"));
  const onClick = () => setShow(!show);
  const onClose = () => setShow(false);

  const router = useRouter();

  useEffect(() => {
    setLocale(localStorage?.getItem("locale") as string);
  }, [localStorage]);

  return (
    <React.Fragment>
      <Navbar
        style={{ background: "#1A1A1A" }}
        className="md:w-[95vw] md:ml-6 absolute w-full z-50 top-[56px] min-h-[72px] h-fit align-middle items-center rounded-xl"
        fluid={true}
        rounded={true}
      >
        <Navbar.Brand href="/">
          <span className="text-3xl text-ueventText mt-2">GATHERWISE</span>
        </Navbar.Brand>
        <div className="flex md:order-2 gap-4 bg-transparent mt-1">
          <div className="relative flex items-center self-center">
            <input
              className="relative rounded-lg bg-ueventSecondary w-11/12 md:w-full border-ueventText border-2 text-sm p-2 pl-14"
              placeholder={t("search")}
            />
            <HiSearch
              size={30}
              className="text-ueventText absolute left-0 ml-3"
            />
          </div>
          <div
            className="self-center cursor-pointer text-ueventText text-xs"
            onClick={() => {
              localStorage?.setItem("locale", locale === "en" ? "uk" : "en");
              router.reload();
            }}
          >
            <span className={locale === "en" ? "text-ueventContrast" : ""}>
              EN
            </span>
            /
            <span className={locale === "uk" ? "text-ueventContrast" : ""}>
              UK
            </span>
          </div>
          {session?.user ? (
            <ProfileMenu user={session?.user as User} />
          ) : (
            <button
              data-modal-target="defaultModal"
              data-modal-toggle="defaultModal"
              onClick={onClick}
              className="rounded-lg bg-ueventContrast md:text-base text-xs text-ueventText p-1"
            >
              {t("login")}
            </button>
          )}
          <Navbar.Toggle className="h-[32px]" />
        </div>
        <Navbar.Collapse className="text-ueventText text-center mt-3">
          <Link
            className={`self-center text-2xl font-bold ${
              router.asPath === "/" ? "text-ueventContrast" : ""
            }`}
            href="/"
          >
            {t("home")}
          </Link>
          <Link
            href="/events"
            className={`self-center text-2xl font-bold ${
              router.asPath === "/events" ? "text-ueventContrast" : ""
            }`}
          >
            {t("events")}
          </Link>
          <Link
            href="/news"
            className={`self-center text-2xl font-bold ${
              router.asPath === "/news" ? "text-ueventContrast" : ""
            }`}
          >
            {t("news")}
          </Link>
          <Link
            href="/reviews"
            className={`self-center text-2xl font-bold ${
              router.asPath === "/reviews" ? "text-ueventContrast" : ""
            }`}
          >
            {t("reviews")}
          </Link>
        </Navbar.Collapse>
      </Navbar>
      <SignInModal show={show} onClose={onClose} />
    </React.Fragment>
  );
};

function ProfileMenu({ user }: { user: User }) {
  return (
    <Dropdown
      arrowIcon={false}
      inline={true}
      label={
        <div className="relative w-[40px] h-[40px] flex items-center justify-center">
          <Image
            alt="profileImg"
            src={user.image as string}
            fill
            sizes=""
            className="rounded-full"
          />
        </div>
      }
    >
      <Dropdown.Header>
        <span className="block text-sm">{user.name}</span>
        <span className="block truncate text-sm font-medium">{user.email}</span>
      </Dropdown.Header>
      <Link href={"/profile"}>
        <Dropdown.Item>Profile</Dropdown.Item>
      </Link>
      <Link href={"/profile/favorites"}>
        <Dropdown.Item>Favorites</Dropdown.Item>
      </Link>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Organization</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
    </Dropdown>
  );
}

export default Header;
