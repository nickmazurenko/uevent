import Layout from "@/components/Layout";
import CreateOrganization from "@/components/Organization/CreateOrganization";
import Organization from "@/components/Organization/Organization";
import OrganizationService from "@/lib/organizations/OrganizationService";
import { Organization as Org } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { options } from "@/pages/api/auth/[...nextauth]";
import Menu from "@/components/profile/Menu";

type Props = {
  organization?: Org | undefined;
};

const OrganizationPage = ({ organization }: Props) => {
  return (
    <Layout>
      <div className="relative w-full h-full pt-44 md:mr-3">
        <div className="flex flex-col  md:flex-row md:p-8 gap-10 w-full h-full">
          <Menu />
          <Organization organization={organization as Org} />
        </div>
      </div>
    </Layout>
  );
};

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

  const organization = await OrganizationService.getUserOrganization(
    // @ts-ignore
    session.user
  );
  return { props: { organization } };
}

export default OrganizationPage;
