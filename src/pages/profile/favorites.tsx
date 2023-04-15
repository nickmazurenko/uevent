import Layout from "@/components/Layout";
import FavoritesDescription from "@/components/profile/FavoritesDescription";
import EventService from "@/lib/events/EventService";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]";
import { getUserByEmail } from "@/lib/users";
import { Event } from "@/components/eventspage/EventCard";
import EventsList from "@/components/eventspage/EventsList";
import ContactUs from "@/components/eventspage/ContactUs";

type Props = {
  favorites: Event[];
};

export default function Favorites(props: Props) {
  console.log(props);
  return (
    <Layout>
      <div className="relative flex flex-col gap-5 w-full h-full">
        <FavoritesDescription />
        <div className="w-full h-full flex flex-col justify-center items-center">
          {props.favorites.length ? (
            <EventsList className="w-full h-full" events={props.favorites} removeMenu={true} />
          ) : (
            <span className="text-2xl text-center text-ueventText">
              {"There are no favorite events yet :("}
            </span>
          )}
          <ContactUs />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, options);

  if (!session || !session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  const user = await getUserByEmail(session?.user.email as string, true);
  return { props: { favorites: user.favorites } };
}
