// schemas/addUserSchema.ts
import { z } from "zod";

export const addUserSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters long.")
    .max(50, "First name cannot be longer than 50 characters."),
  lastName: z
    .string()
    .min(3, "Last name must be at least 3 characters long.")
    .max(50, "Last name cannot be longer than 50 characters."),
  email: z.string().email("Please enter a valid email address."),
  nickname: z
    .string()
    .min(2, "Nickname must be at least 2 characters long.")
    .max(30, "Nickname cannot be longer than 30 characters.")
    .optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character.",
    ),
  phoneNumber: z
    .string()
    .regex(/^9\d{9}$/, "Phone number must be 10 digits and start with 9."),
  telegramPhoneNumber: z
    .string()
    .regex(
      /^9\d{9}$/,
      "Telegram phone number must be 10 digits and start with 9.",
    ),
  whatsappPhoneNumber: z
    .string()
    .regex(
      /^9\d{9}$/,
      "WhatsApp phone number must be 10 digits and start with 9.",
    ),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters long.")
    .max(100, "Address cannot be longer than 100 characters.")
    .optional(),
  instagramId: z
    .string()
    .regex(/^([a-zA-Z0-9_]{5,30})$/, "Please enter a valid Instagram ID."),
  role: z
    .string()
    .refine((val) => ["admin", "moderator", "user"].includes(val), {
      message: "Role must be one of 'user', 'admin', or 'moderator'.",
    }),
});

export type AddUserSchemaType = z.infer<typeof addUserSchema>;
