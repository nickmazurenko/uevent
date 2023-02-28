import DataURIParser from "datauri/parser";
import path from "path";

export enum OrganizationFormFields {
    Name,
    Description,
    Image,
    All
}

export type FormBody = {
    name?: string | undefined,
    description?: string | undefined
}

export interface IFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}

export class OrganizationFormParserError extends Error {
    statusCode: Number = 400;

    constructor(message: string) {
        super(message);
    }
}

export default class OrganizationFormParser {

    requiredFields: OrganizationFormFields[] | OrganizationFormFields.All

    constructor({ requiredFields }: { requiredFields: OrganizationFormFields[] | OrganizationFormFields.All }) {

        this.requiredFields = requiredFields;

    }

    getImage(files: IFile[]) {
        return files.find(file => file.fieldname === "organizationImage");
    }

    isNameInBody(body: FormBody) {
        return 'name' in body ? body.name : false;
    }

    isDescriptionInBody(body: FormBody) {
        return 'description' in body ? body.description : false;
    }

    isImageInFiles(files: IFile[]) {
        const image = this.getImage(files);
        return image ?? false;
    }

    checkRequiredFields(body: FormBody, files: IFile[]) {

        let checkAll = this.requiredFields === OrganizationFormFields.All;

        const requiredFieldsArray = this.requiredFields as OrganizationFormFields[];

        const result: { name?: string | null, description?: string | null, image?: IFile | null } =
            { name: null, description: null, image: null };

        if (checkAll || requiredFieldsArray.includes(OrganizationFormFields.Name)) {
            if (!this.isNameInBody(body)) throw new OrganizationFormParserError("Name is required");
        }

        if (checkAll || requiredFieldsArray.includes(OrganizationFormFields.Description)) {
            if (!this.isDescriptionInBody(body)) throw new OrganizationFormParserError("Description is required");
        }

        if (checkAll || requiredFieldsArray.includes(OrganizationFormFields.Image)) {
            if (!this.isImageInFiles(files)) throw new OrganizationFormParserError("Image is required");
        }

        result.name = body.name;
        result.description = body.description;
        result.image = this.getImage(files);

        return result;
    }

    parse(body: FormBody, files: IFile[]) {


        const fields = this.checkRequiredFields(body, files);
        let base64Image: DataURIParser | null = null;

        if (fields.image) {
            const imageParser = new DataURIParser();
            base64Image = imageParser.format(path.extname(fields.image.originalname), fields.image.buffer);
        }


        return {
            name: fields.name,
            description: fields.description,
            image: base64Image
        }

    }

}