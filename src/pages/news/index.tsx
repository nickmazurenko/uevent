import Layout from "@/components/Layout";
import NewsDescription from "@/components/news/NewsDescription";
import NewsList from "@/components/news/NewsList";
import OrganizationService from "@/lib/organizations/OrganizationService";
import { News } from "@prisma/client";
import { GetServerSidePropsContext } from "next";

type Props = {
  news: News[];
};

export default function NewsPage(props: Props) {
  return (
    <Layout>
      <div className="relative flex flex-col gap-5 w-full h-full">
        <NewsDescription />
        <div className="flex flex-wrap w-full h-full justify-between">
          <NewsList news={props.news} />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const news = await OrganizationService.retrieveAllNews();

  return { props: { news } };
}
