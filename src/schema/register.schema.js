import * as zod from "zod";
export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters"),

    email: zod
      .string()
      .nonempty("Email is required")
      .email("Please enter a valid email address"),

    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain uppercase, lowercase, number and special character",
      ),
    rePassword: zod.string().nonempty("Confirm password is required"),
    dateOfBirth: zod.string().nonempty("Date of birth is required"),
    gender: zod.enum(["female", "male"], "Please select your gender"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });
