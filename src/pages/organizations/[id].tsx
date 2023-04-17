import Layout from "@/components/Layout";
import Organization from "@/components/Organization/Organization";
import Description from "@/components/homepage/HomeDescription";
import OrganizationService from "@/lib/organizations/OrganizationService";
import prisma from "@/lib/prisma";
import { Organization as Org } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
function OrganizationPage({ organization }: { organization: Org }) {
  return (
    <Layout>
      <div className="relative flex flex-col gap-20 w-full h-full">
        <Description />
        <div className="flex flex-wrap w-full h-full justify-between">
          <Organization organization={organization} />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // @ts-ignore
  const { id } = context.params;
  const organization = await OrganizationService.retrieveOne(id);

  return {
    props: {
      organization,
    },
  };
}

export default OrganizationPage;
