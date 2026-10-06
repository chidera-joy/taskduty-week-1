import z from "zod";

export const registerSchema = z.object({
    name: z.string().min(4, "Name must be at least 4 characters"),
    email: z.string().email( "Please provide a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters").regex(/[A-Z]/, "Password must contain atleast on uppercase letter").regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
});

export const loginSchema = z.object({
    email: z.string().email("Please provide a valid email"),
    password: z.string().min(8, "Password must be atleast 8 characters.")
})