import { NextApiRequest, NextApiResponse } from "next";
import DataURIParser from "datauri/parser";
import multer from "multer";
import nc from "next-connect";
import { getSession } from "next-auth/react";
import { getUserByEmail } from "@/lib/users";
import OrganizationFormParser, {
  FormBody,
  IFile,
  OrganizationFormFields,
} from "@/lib/organizations/OrganizationFormParser";
import uploadOrganizationImage from "@/lib/organizations/uploadOrganizationImage";
import OrganizationService from "@/lib/organizations/OrganizationService";
import { User } from "@prisma/client";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const handler = nc({
  onError: (err, req, res: NextApiResponse, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
})
  .use(multer().any())
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session || !session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = await getUserByEmail(session.user?.email || "");
      const userOrganization = await OrganizationService.getUserOrganization(user);
      if (!userOrganization) {
        return res
          .status(400)
          .json("User should have an organization to create news");
      }

      const {
        title,
        plot,
        // @ts-ignore
      } = req.body;

      // @ts-ignore
      const file = req.files.find((file) => file.fieldname === "newsImage");

      try {
        const imageParser = new DataURIParser();
        const image = imageParser.format(
          path.extname(file.originalname),
          file.buffer
        );
        const cloudinaryImage = await uploadOrganizationImage(
          image as DataURIParser
        );
        const news = await OrganizationService.createNews({
          title,
          plot,
          image: cloudinaryImage,
          organizationId: userOrganization.id as string,
        });

        res.status(201).json({ data: { news } });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error, data: null });
      }

      // @ts-ignore
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      // await prisma.$disconnect();
    }
  });

export default handler;
