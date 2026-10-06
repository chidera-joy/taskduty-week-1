import mongoose, {Document} from "mongoose";
import type { Schema } from "zod/v3";

interface UserInt extends Document{
    name: string
    email: string
    password: string
}

const UserSchema = new mongoose.Schema<UserInt>(
    {
        name:{
            required: true,
            type: String,
            trim: true
        },
        email:{
            required: true,
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password:{
            type: String,
            required: true,
        }
    },
    {
        timestamps:true,
    }
)

export const User = mongoose.model<UserInt>("User", UserSchema)