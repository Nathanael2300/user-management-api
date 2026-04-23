import { z } from "zod";

export const getUserSchemaById = z.object({
  id: z.coerce.number().int().positive(),
});

export const createUserSchema = z.object({
  email: z.string().email().trim(),

  password: z
    .string()
    .min(6)
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),

  username: z.string().min(3).trim(),

  nickname: z.string().min(3).trim().optional(),

  profilePicture: z.string().url().trim().optional(),

  bio: z.string().trim().max(200).optional(),

  phoneNumber: z
    .string()
    .regex(/^\d{11}$/, "Phone must have 11 digits")
    .optional(),

  address: z
    .object({
      street: z.string().trim().min(1),
      city: z.string().trim().min(1),
      state: z.string().length(2),
      zipCode: z.string().trim().min(1),
    })
    .optional(),

  website: z.string().url().trim().optional(),

  socialLinks: z.array(z.string().url().trim()).max(5).optional(),
});

export const updateUserSchema = createUserSchema.partial();

export const userDeleteSchema = z.object({
  id: z.coerce.number().int().positive(),
});
