import Iron from "@hapi/iron";
import { NextApiRequest, NextApiResponse } from "next";
import { MAX_AGE, setTokenCookie, getTokenCookie } from "./auth-cookies";

const AUTH_TOKEN_SECRET = process.env.AUTH_TOKEN_SECRET || "";

if (!AUTH_TOKEN_SECRET || AUTH_TOKEN_SECRET.length === 0) {
    throw new Error('Please define the AUTH_TOKEN_SECRET environment variable inside .env.local')
}

export async function setLoginSession(res: NextApiResponse, session: any) {
    const createdAt = Date.now();

    const obj = {...session, createdAt, maxAge: MAX_AGE};
    const token = await Iron.seal(obj, AUTH_TOKEN_SECRET, Iron.defaults);

    setTokenCookie(res, token);
}

export async function getLoginSession(req: NextApiRequest) {
    const token = getTokenCookie(req);

    if (!token) return;

    const session = await Iron.unseal(token, AUTH_TOKEN_SECRET, Iron.defaults);
    const expiresAt = session.createdAt + session.maxAge * 1000;

    if (Date.now() > expiresAt) {
        throw new Error('Session expired');
    }

    return session;
}
