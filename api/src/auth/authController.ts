import { type Request, type Response } from "express";
import { registerSchema, loginSchema } from "./authValidation.js";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response)=>{
    try{
        // Validate the request data 
        const result = registerSchema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json({
                success: false,
                message: "Invalid registration data",
                errors: result.error.issues,
            });
        }

        const {name, email, password} = result.data;

        // check if email already exists 
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Hash password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user 
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
        });
    }
    catch(error){
        console.error("Registration failed", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const loginUser = async (req:Request, res: Response) =>{
    try{
        // Validate the requset data 
        const result = loginSchema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json({
                success:false,
                message: "Invalid login data",
                errors: result.error.issues
            });
        }

        const {email,password} = result.data;

        // check if email exists 
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(401).json({
                success:false,
                message: "Invalid email or password"
            })
        }

        // create jwt token
        const token = jwt.sign(
            { id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            success:true,
            message: "Login successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email: user.email,
            },
        })
    }
    catch(error){
        console.error("Login failed", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

