import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { HiMenu, HiSearch } from "react-icons/hi";
import { Navbar, Button, TextInput, Dropdown } from "flowbite-react";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
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
            className="relative rounded-lg bg-ueventSecondary border-ueventText border-2 text-sm p-2 pl-14"
            placeholder="Search"
          />
          <HiSearch
            size={30}
            className="text-ueventText absolute left-0 ml-3"
          />
        </div>
        <button className="rounded-lg bg-ueventContrast md:text-base text-xs text-ueventText p-1">
          Log In
        </button>
        <Navbar.Toggle className="h-[32px]" />
      </div>
      <Navbar.Collapse className="text-ueventText text-center mt-3">
        <Link
          className={`self-center text-2xl font-bold ${router.asPath === '/' ? 'text-ueventContrast' : ''}`}
          href="/"
        >
          Home
        </Link>
        <Link href="/events" className={`self-center text-2xl font-bold ${router.asPath === '/events' ? 'text-ueventContrast' : ''}`}>
          Events
        </Link>
        <Link href="/news" className={`self-center text-2xl font-bold ${router.asPath === '/news' ? 'text-ueventContrast' : ''}`}>
          News
        </Link>
        <Link href="/reviews" className={`self-center text-2xl font-bold ${router.asPath === '/reviews' ? 'text-ueventContrast' : ''}`}>
          Reviews
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
