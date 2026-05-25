import * as zod from "zod";
export const loginSchema = zod.object({
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
});
