import { Organization, User } from "@prisma/client";
import { getUserByEmail } from "../users";
import prisma from "@/lib/prisma";

export interface ICloudinaryImage {
  url: string;
  public_id: string;
  signature: string;
}

export type UpdateParams = {
  name: string | null;
  description: string | null;
  image: ICloudinaryImage | null;
};

type UpdateData = {
  name?: string;
  description?: string;
  image?: string;
  image_id?: string;
  image_signature?: string;
};

export default class OrganizationService {
  static async create(
    owner: User,
    name: string,
    description: string,
    image: ICloudinaryImage
  ) {
    const newOrganization = await prisma.organization.create({
      data: {
        name,
        ownerId: owner.id,
        description,
        image: image.url,
        image_id: image.public_id,
        image_signature: image.signature,
      },
    });

    return newOrganization;
  }

  static async update(
    organization: Organization,
    { name, description, image }: UpdateParams
  ) {
    const data: UpdateData = {};

    if (name) data.name = name;
    if (description) data.description = description;

    if (image) {
      data.image = image.url;
      data.image_id = image.public_id;
      data.image_signature = image.signature;
    }

    const updateOrganization = await prisma.organization.update({
      where: {
        id: organization.id,
      },
      data,
    });

    return updateOrganization;
  }

  static async getUserOrganization(user: User | null) {
    if (!user) return null;
    if (!user.id) {
      user.id = (await getUserByEmail(user.email as string)).id;
    }

    const organization = await prisma.organization.findFirst({
      where: {
        ownerId: user?.id,
      },
      include: {
        news: true,
        events: {
          include: {
            purchasedTickets: true,
            favoritedBy: {
              select: {
                user: {
                  select: {
                    email: true,
                  },
                },
              },
            },
          },
        },
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
      // @ts-ignore
      organization.events = organization?.events.map((event) => ({
        ...event,
        start_at: event.start_at.toISOString(),
        created_at: event.created_at.toISOString(),
      }));

    if (organization?.news)
      // @ts-ignore
      organization.news = organization?.news?.map((news) => ({
        ...news,
        createdAt: news.createdAt.toISOString(),
      }));

    return organization;
  }

  static async createNews({
    title,
    plot,
    image,
    organizationId,
  }: {
    title: string;
    plot: string;
    image: ICloudinaryImage;
    organizationId: string;
  }) {
    return await prisma.news.create({
      data: {
        title,
        plot,
        image: image.url,
        image_id: image.public_id,
        image_signature: image.signature,
        organizationId: organizationId,
      },
    });
  }

  static async retrieveAllNews() {
    const news = await prisma.news.findMany({
      include: {
        organization: true,
      },
      orderBy: { createdAt: "asc" },
    });

    return news.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
    }));
  }

  static async retrieveOne(id: string) {
    const organization = await prisma.organization.findFirst({
      where: {
        id,
      },
      include: {
        news: true,
        events: {
          include: {
            purchasedTickets: true,
            favoritedBy: {
              select: {
                user: {
                  select: {
                    email: true,
                  },
                },
              },
            },
          },
        },
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
      // @ts-ignore
      organization.events = organization?.events.map((event) => ({
        ...event,
        start_at: event.start_at.toISOString(),
        created_at: event.created_at.toISOString(),
      }));

    if (organization?.news)
      // @ts-ignore
      organization.news = organization?.news?.map((news) => ({
        ...news,
        createdAt: news.createdAt.toISOString(),
      }));

    return organization;
  }
}
