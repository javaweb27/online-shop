import { z } from "zod"
import { regex } from "../../../helps/regex"

export const AuthFormSchema = z.object({
  email: z
    .string()
    .min(1, "This field is required")
    .max(100, "This field can't have more than 100 characters")
    .regex(regex.email, "Email format must be like: someuser@email.com"),
  password: z
    .string()
    .min(1, "This field is required")
    .min(7, "This field requires at least 7 characters")
    .max(50, "This field can't have more than 50 characters"),
})
