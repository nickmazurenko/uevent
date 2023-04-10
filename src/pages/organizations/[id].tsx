import Organization from "@/components/Organization/Organization";
import prisma from "@/lib/prisma";
import { Organization as Org } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
function OrganizationPage({ organization }: { organization: Org }) {
  return <Organization organization={organization} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // @ts-ignore
  const { id } = context.params;
  const organization = await prisma.organization.findUnique({
    where: {
      id,
    },
    include: {
      events: true,
      owner: {
        select: {
          image: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (organization?.events)
    organization.events = organization?.events.map((event) => ({
      ...event,
      start_at: event.start_at.toISOString(),
      created_at: event.created_at.toISOString(),
    }));

  return {
    props: {
      organization,
    },
  };
}

export default OrganizationPage;
