import Layout from "@/components/Layout";
import UserCard from "@/components/profile/UserCard";
import { User } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]";
import { getUserByEmail } from "@/lib/users";
import Menu from "@/components/profile/Menu";

function Profile({ user }: { user: User }) {
  return (
    <Layout>
      <div className="relative w-full h-full pt-44 md:mr-3">
        <div className="flex flex-col  md:flex-row md:p-8 gap-10 w-full h-full">
          <Menu />
          <UserCard user={user} />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, options);

  if (!session || !session.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  // @ts-ignore
  const user = await getUserByEmail(session.user.email);

  return { props: { user } };
}

export default Profile;
