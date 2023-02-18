import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  
  const { data: session, status } = useSession();

  return (
    <div className="w-full p-5 text-header flex justify-between header">
      <Link href="/" className="text-header">
        Home
      </Link>
      {session ? (
        <div className="flex justify-around w-1/2">
          <span>{session.user?.email}</span>
          <Link href="/profile">Profile</Link>
          <button onClick={() => signOut()}>
            <a>Log out</a>
          </button>
        </div>
      ) : (
        <Link href="/auth/signin" className="text-header">
          Sign In
        </Link>
      )}
    </div>
  );
};

export default Header;
