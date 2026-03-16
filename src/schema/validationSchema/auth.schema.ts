import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is Required!")
      .min(3, "min charachters is 3")
      .max(60, "max charachters is 60"),
    email: z.email({ error: "Email is Required!" }),
    password: z
      .string()
      .nonempty("Password is Required!")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/,
        "Password must contain uppercase, lowercase, special character, and be at least 8 characters long.",
      ),
    rePassword: z.string().nonempty("Re-Password is Required!"),
    phone: z
      .string()
      .nonempty("Phone number is Required!")
      .regex(/^(01)[0-2,5][0-9]{8}$/, "phone number must be Egyptian"),
  })
  .refine((object) => object.rePassword === object.password, {
    path: ["rePassword"],
    error: "re-password and password must be match!",
  });

export type registerSchemaType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email({ error: "Email is Required!" }),
  password: z
    .string()
    .nonempty("Password is Required!")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/,
      "Password must contain uppercase, lowercase, special character, and be at least 8 characters long.",
    ),
});

export type loginSchemaType = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.email({ error: "Email is Required!" }),
});

export type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  email: z.email({ error: "Email is Required!" }),
  newPassword: z
    .string()
    .nonempty("Password is Required!")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/,
      "Password must contain uppercase, lowercase, special character, and be at least 8 characters long.",
    ),
});

export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
