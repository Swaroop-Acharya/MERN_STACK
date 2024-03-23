const { z } = require("zod");

//creating an object schemea

//sigup schema

const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is not valid" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .min(10, { message: "Phone must be at least 10 characters" })
    .max(10, { message: "Phone must be at most 10 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must be at most 20 characters" }),
});
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is not valid" }),
  password: z
    .string({ required_error: "Password is required" })
    
    
});

module.exports = { signupSchema,loginSchema };
