import { z } from "zod";

export const ValidationSchema = z.object({
  fullName: z.string().refine((fullName) => /^\S+\s\S+$/.test(fullName), {
    message: "Full Name must be in the format 'First Last'",
  }),
  email: z.string().email({ message: "Incorrect email format" }),
  phone: z
    .string()
    .refine((phone) => /^\+38 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(phone), {
      message: "Incorrent number phone",
    }),
});

export type CheckoutTypes = z.infer<typeof ValidationSchema>;
