import DataURIParser from "datauri/parser";
import path from "path";

export enum EventFormFields {
  Name,
  Description,
  StartAt,
  Location,
  Tickets,
  Cost,
  Image,
  Tags,
  All,
}

export type FormBody = {
  name?: string | undefined;
  description?: string | undefined;
  startAt?: string | undefined;
  duration?: string | undefined;
  cost?: Cost | undefined;
  tickets?: string | undefined;
  location: string;
  tags?: string[] | undefined;
};

type Cost = {
  amount: number;
  currency: string;
}

export interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: string;
  size: string;
}

export class EventFormParserError extends Error {
  statusCode: Number = 400;

  constructor(message: string) {
    super(message);
  }
}

export default class EventFormParser {
  requiredFields: EventFormFields[] | EventFormFields.All;

  constructor({
    requiredFields,
  }: {
    requiredFields: EventFormFields[] | EventFormFields.All;
  }) {
    this.requiredFields = requiredFields;
  }

  getImages(files: IFile[]) {
    return files.filter((file) => file.fieldname === "eventImage");
  }

  hasName(body: FormBody) {
    return "name" in body ? body.name : false;
  }

  hasDescription(body: FormBody) {
    return "description" in body ? body.description : false;
  }

  hasStartAt(body: FormBody) {
    return "startAt" in body ? body.startAt : false;
  }
  
  isDurationInBody(body: FormBody) {
    return "duration" in body ? body.duration : false;
  }

  hasTickets(body: FormBody) {
    return "tickets" in body ? body.tickets : false;
  }

  hasCost(body: FormBody) {
    return "cost" in body ? body.cost : false;
  }

  hasLocation(body: FormBody) {
    return "location" in body ? body.location : false;
  }

  hasTags(body: FormBody) {
    return "tags" in body ? body.tags : false;
  }

  hasImage(files: IFile[]) {
    const image = this.getImages(files);
    return image ?? false;
  }

  checkRequiredFields(body: FormBody, files: IFile[]) {
    let checkAll = this.requiredFields === EventFormFields.All;

    const requiredFieldsArray = this.requiredFields as EventFormFields[];

    const result: {
      name?: string | null;
      description?: string | null;
      startAt?: string | null;
      duration?: number | null;
      images?: IFile[] | null;
      tickets?: number | null;
      cost?: Cost | null;
      location?: JSON | null;
      tags?: string[] | null
    } = {
      name: null,
      description: null,
      startAt: null,
      duration: null,
      images: null,
      tickets: null,
      cost: null,
      location: null,
      tags: null,
    };
    
    if (checkAll || requiredFieldsArray.includes(EventFormFields.Name)) {
      if (!this.hasName(body))
        throw new EventFormParserError("Name is required");
    }
    if (checkAll || requiredFieldsArray.includes(EventFormFields.Description)) {
      if (!this.hasDescription(body))
        throw new EventFormParserError("Description is required");
    }
    if (checkAll || requiredFieldsArray.includes(EventFormFields.StartAt)) {
      if (!this.hasStartAt(body))
        throw new EventFormParserError("Event start date is required");
    }
    if (checkAll || requiredFieldsArray.includes(EventFormFields.Image)) {
      if (!this.hasImage(files))
        throw new EventFormParserError("Image is required");
    }
    if (checkAll || requiredFieldsArray.includes(EventFormFields.Tickets)) {
      if (!this.hasTickets(body))
        throw new EventFormParserError("Tickets is required");
    }
    if (checkAll || requiredFieldsArray.includes(EventFormFields.Cost)) {
      if (!this.hasCost(body))
        throw new EventFormParserError("Cost is required");
    }
    if (checkAll || requiredFieldsArray.includes(EventFormFields.Location)) {
      if (!this.hasLocation(body))
        throw new EventFormParserError("Location is required");
    }
    if (checkAll || requiredFieldsArray.includes(EventFormFields.Tags)) {
      if (!this.hasTags(body))
        throw new EventFormParserError("Tags is required");
    }
    result.name = body.name;
    result.description = body.description;
    result.startAt = body.startAt;
    result.duration = body.duration ? parseInt(body.duration): 0;
    result.images = this.getImages(files);
    result.cost = {
      // @ts-ignore
      amount: parseFloat(body.cost?.amount) ?? 0,
      currency: body.cost?.currency ?? "USD"
    };
    result.tickets = body.tickets ? parseInt(body.tickets): 0;
    result.location = JSON.parse(body.location);
    result.tags = body.tags;

    return result;
  }

  parse(body: FormBody, files: IFile[]) {
    const fields = this.checkRequiredFields(body, files);
    let base64Images: DataURIParser[] | null = [];

    if (fields.images) {
      fields.images.forEach((image) => {
        const imageParser = new DataURIParser();
        base64Images?.push(imageParser.format(
          path.extname(image.originalname),
          image.buffer
        ));
      });
    }
    return {
      name: fields.name,
      description: fields.description,
      startAt: fields.startAt,
      duration: fields.duration,
      images: base64Images,
      cost: fields.cost,
      tickets: fields.tickets,
      location: fields.location,
      tags: fields.tags,
    };
  }
}
