import type{ Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export interface JWTPayload {
  id: string;
  email: string;
}

export const authMiddleWare = (req:Request, res:Response, next:NextFunction) =>{
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;

        console.log("Decoded token:", decoded);
        req.user = decoded;

        next();
    
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expiredtoken"
        });
    }
}