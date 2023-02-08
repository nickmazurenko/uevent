import crypto from "crypto";
import Local from "passport-local";
import User from "../models/User.model";
import dbConnect from "./dbConnect";

export interface CreateUserData {
    email: string,
    username: string,
    password: string
}

export interface UserData {
    email: string,
    username: string,
    password: string,
    salt: string
}

export default class UserService {

    static async connect() {
        await dbConnect();
    }

    static hashPassword(password: string, salt?: string) {

        if (!salt) {
            salt = crypto.randomBytes(16).toString('hex');
        }

        const hash = crypto
            .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
            .toString('hex');

        return { hash, salt };
    }

    static validatePassword(user: UserData, inputPassword: string) {
        const { hash: inputHash } = this.hashPassword(inputPassword, user.salt);
        return user.password === inputHash;
    }

    static async createUser(userData: CreateUserData) {


        await this.connect();

        const checkUser = await User.findOne({
            $or: [{ username: userData.username }, { email: userData.email }]
        });


        if (checkUser) {
            throw new DuplicateEmailOrUsername();
        }

        const { hash, salt } = this.hashPassword(userData.password);

        const user = new User({
            email: userData.email,
            username: userData.username,
            salt,
            password: hash
        });

        await user.save();

        return user;
    }

    static localStrategy = new Local.Strategy(function (email, password, done) {
        User.findOne({ email }).then((user: UserData) => {
            if (user && UserService.validatePassword(user, password)) {
                done(null, user);
            } else {
                done(new UserNotFound());
            }
        }).catch((error) => {
            done(error);
        });
    });

    static toResponse(userData: UserData) {
        const { email, username } = userData;
        return { email, username };
    }

    static async getOne(userData: UserData) {
        return await User.findOne(userData);
    }
}

export class UserServiceError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class DuplicateEmailOrUsername extends UserServiceError {
    constructor() {
        super("User email and username must be unique.");
    }
}

export class UserNotFound extends UserServiceError {
    constructor() {
        super("User not found");
    }
}
