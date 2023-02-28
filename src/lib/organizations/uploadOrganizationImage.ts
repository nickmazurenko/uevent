import DataURIParser from "datauri/parser";
import cloudinary from '@/lib/cloudinary';

export default async function uploadOrganizationImage(image: DataURIParser) {

    const uploadImageResponse = cloudinary.uploader.upload(image.content, "uevent", { resource_type: "image" });
    return uploadImageResponse;

}