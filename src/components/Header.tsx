import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  
  const { data: session, status } = useSession();

  return (
    <div className="w-full p-5 text-white flex justify-between bg-gray-800">
      <Link href="/" className="text-white">
        Home
      </Link>
      {session ? (
        <div className="flex justify-around w-1/2">
          <span>{session.user?.email}</span>
          <Link href="/profile">Profile</Link>
          <Link href="/organizations">Organization</Link>
          <button onClick={() => signOut()}>
            <a>Log out</a>
          </button>
        </div>
      ) : (
        <Link href="/auth/signin" className="text-white">
          Sign In
        </Link>
      )}
    </div>
  );
};

export default Header;
