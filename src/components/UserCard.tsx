import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const UserCard: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    session?.user ? router.push("/profile") : router.push("/");
  }, []);

  return (
    <div className="w-min flex flex-col p-2 bg-gray-600 gap-2 justify-center justify-items-center items-center">
      {session?.user?.image ? (
        <Image
          src={session.user.image}
          width={200}
          height={200}
          alt="avatar"
        />
      ) : null}
      <span className="text-2xl">{session?.user?.name}</span>
      <span className="text-xl">{session?.user?.email}</span>
    </div>
  );
};

export default UserCard;
