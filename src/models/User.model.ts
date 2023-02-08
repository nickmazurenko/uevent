import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email for this user."],
        unique: true
    },
    username: {
        type: String,
        required: [true, "Please provide a login for this user."],
        unique: true
    },
    salt: {
        type: String,
        required: [true, "Please provide a salt for this user."]
    },
    password: {
        type: String,
        required: [true, "Please provide a password for this user."],
    },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);