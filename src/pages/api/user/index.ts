import { getLoginSession } from '@/lib/auth';
import UserService from '@/lib/UserService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getLoginSession(req);
        const user = (session && (UserService.toResponse(await UserService.getOne(session)))) ?? null;

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).end('Authentication token is invalid, please log in');
    }
}
