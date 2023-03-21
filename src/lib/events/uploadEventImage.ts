import DataURIParser from "datauri/parser";
import cloudinary from "../cloudinary";

export default async function uploadEventImage (image: DataURIParser) {
  const uploadImageResponse = await cloudinary.uploader.upload(image.content, "uevent", {response_type: "image"});
  return uploadImageResponse;
}