import { NextApiRequest, NextApiResponse } from 'next';
import UserService, {DuplicateEmailOrUsername} from '../../lib/UserService'

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  try {
    // validation
    await UserService.createUser(req.body);
    res.status(200).send({ done: true });
  } catch (error: any) {

    if (error instanceof DuplicateEmailOrUsername) {
      res.status(400).end(error.message);
    }
    else {
      console.error(error);
      res.status(500).end(error.message);
    }

  }
}
