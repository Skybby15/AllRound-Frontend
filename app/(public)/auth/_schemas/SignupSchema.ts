import z from "zod";

export const signupSchema = z
    .object({
        username: z.string().min(3, "Username must be at least 3 characters."),
        email: z.email("Please enter a valid email address."),
        password: z
            .string()
            .nonempty("Password is required.")
            .min(6, "Password must be at least 6 characters."),
        confirmPassword: z.string().nonempty("Please confirm your password."),
    })
    .refine((data) => data.password === data.confirmPassword, {
        error: "Passwords do not match!",
        path: ["confirmPassword"],
    });
