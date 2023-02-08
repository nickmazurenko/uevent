import passport from "passport";
import nextConnect from "next-connect";
import UserService, { UserData } from "@/lib/UserService";
import { setLoginSession } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

const authenticate = (method: string, req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
        passport.authenticate(method, { session: false }, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token);
            }
        })(req, res);
    });

passport.use(UserService.localStrategy);

// passport.serializeUser stores user object passed in the cb method above in req.session.passport
passport.serializeUser((user, cb) => {
    process.nextTick(function () {
        return cb(null, user);
    });
});

// passport.deserializeUser stores the user object in req.user
passport.deserializeUser(function (
    user: any,
    cb: (arg0: null, arg1: any) => any
) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

export default nextConnect()
    .use(passport.initialize())
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        try {

            const user = await authenticate('local', req, res);


            const session = { email: "", username: "" };
            // @ts-ignore
            session.email = user.email;
            // @ts-ignore
            session.username = user.username;

            await setLoginSession(res, session);

            res.status(200).send({ done: true });

        } catch (error: any) {
            console.log(error);
            res.status(401).send(error.message);
        }
    })