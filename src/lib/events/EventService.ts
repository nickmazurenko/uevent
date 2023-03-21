import {Organization} from '@prisma/client';

export interface ICloudinaryImage {
  url: string,
  public_id: string,
  signature: string,
}

export default class EventService {
  static async create (owner: Organization, name: string, description: string, images: ICloudinaryImage[], tickets: number, cost: number, location: JSON, tags: string[]) {
    const newEvent = await prisma.event.create({
      data: {
        name,
        description,
        images: images.map((image) => image.url),
        tickets,
        cost,
        location,
        tags,
        image_ids: images.map((image) => image.public_id),
        image_signatures: images.map((image) => image.signature),
        organizationId: owner.id,
      }
    });
    return newEvent;
  }
}