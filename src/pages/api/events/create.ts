import { NextApiRequest, NextApiResponse } from 'next';
import DataURIParser from 'datauri/parser';
import multer from 'multer';
import nc from 'next-connect';
import { getSession } from 'next-auth/react';
import { getUserByEmail } from '@/lib/users';
import EventFormParser, {FormBody, IFile, EventFormFields} from '@/lib/events/EventFormParser';
import EventService from '@/lib/events/EventService';
import OrganizationService from '@/lib/organizations/OrganizationService';
import {Organization} from '@prisma/client';
import uploadEventImage from '@/lib/events/uploadEventImage';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc({
  onError: (err, req, res: NextApiResponse, next) => {
    console.error(err.stack);
    res.status(500).end("Something went wrong!");
  }
}).use(multer().any()).post(async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({req});
  if(!session || !session.user) {
    return res.status(401).json({message: "Unauthorized"});
  }
  try {
    const user = await getUserByEmail(session.user?.email || "");
    const organization = await OrganizationService.getUserOrganization(user)
    if(!organization) {
      return res.status(400).json('Cannot create an event without organization');
    }

    const eventFormParser = new EventFormParser({requiredFields: EventFormFields.All});
    const {
      name,
      description,
      images,
      tickets,
      cost,
      location,
      tags
      // @ts-ignore
    } = eventFormParser.parse(req.body as FormBody, req.files as IFile[]);
    try {
      /**
       * Does not return the created event
       * if you add await it takes pretty long to load all the files to cloudinary
       * TODO: figure out if it is needed to return the event here or it can be loaded later
       */

       Promise.all(images.map(async (image) => await uploadEventImage(image as DataURIParser))).then((cloudinaryImages) => {
        console.log(cloudinaryImages);
        EventService.create(
          organization as Organization,
          name as string,
          description as string,
          cloudinaryImages,
          tickets as number,
          cost as number,
          location as JSON,
          tags as string[]
        );
      }); 
      
      res.status(201).json({data: {event: null}})
    } catch (error) {
      console.error(error);
      res.status(500).json({data: null})    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
})

export default handler;