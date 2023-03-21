import DataURIParser from "datauri/parser";
import path from "path";

export enum EventFormFields {
  Name,
  Description,
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
  cost?: string | undefined;
  tickets?: string | undefined;
  location?: JSON | undefined;
  tags?: string[] | undefined;
};

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

  isNameInBody(body: FormBody) {
    return "name" in body ? body.name : false;
  }

  isDescriptionInBody(body: FormBody) {
    return "description" in body ? body.description : false;
  }

  isTicketsInBody(body: FormBody) {
    return "tickets" in body ? body.tickets : false;
  }

  isCostInBody(body: FormBody) {
    return "cost" in body ? body.cost : false;
  }

  isLocationInBody(body: FormBody) {
    return "location" in body ? body.location : false;
  }

  isTagsInBody(body: FormBody) {
    return "tags" in body ? body.tags : false;
  }

  isImageInFiles(files: IFile[]) {
    const image = this.getImages(files);
    return image ?? false;
  }

  checkRequiredFields(body: FormBody, files: IFile[]) {
    let checkAll = this.requiredFields === EventFormFields.All;

    const requiredFieldsArray = this.requiredFields as EventFormFields[];

    const result: {
      name?: string | null;
      description?: string | null;
      images?: IFile[] | null;
      tickets?: number | null;
      cost?: number | null;
      location?: JSON | null;
      tags?: string[] | null
    } = {
      name: null,
      description: null,
      images: null,
      tickets: null,
      cost: null,
      location: null,
      tags: null,
    };
    
    if (checkAll || requiredFieldsArray.includes(EventFormFields.Name)) {
      if (!this.isNameInBody(body))
        throw new EventFormParserError("Name is required");
    }
    if (checkAll || requiredFieldsArray.includes(EventFormFields.Description)) {
      if (!this.isDescriptionInBody(body))
        throw new EventFormParserError("Description is required");
    }
    if (checkAll || requiredFieldsArray.includes(EventFormFields.Image)) {
      if (!this.isImageInFiles(files))
        throw new EventFormParserError("Image is required");
    }
    if (checkAll || requiredFieldsArray.includes(EventFormFields.Tickets)) {
      if (!this.isTicketsInBody(body))
        throw new EventFormParserError("Tickets is required");
    }
    if (checkAll || requiredFieldsArray.includes(EventFormFields.Cost)) {
      if (!this.isCostInBody(body))
        throw new EventFormParserError("Cost is required");
    }
    if (checkAll || requiredFieldsArray.includes(EventFormFields.Location)) {
      if (!this.isLocationInBody(body))
        throw new EventFormParserError("Location is required");
    }
    if (checkAll || requiredFieldsArray.includes(EventFormFields.Tags)) {
      if (!this.isTagsInBody(body))
        throw new EventFormParserError("Tags is required");
    }
    result.name = body.name;
    result.description = body.description;
    result.images = this.getImages(files);
    result.cost = body.cost ? parseFloat(body.cost) : 0;
    result.tickets = body.tickets ? parseInt(body.tickets): 0;
    result.location = body.location;
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
      images: base64Images,
      cost: fields.cost,
      tickets: fields.tickets,
      location: fields.location,
      tags: fields.tags,
    };
  }
}
