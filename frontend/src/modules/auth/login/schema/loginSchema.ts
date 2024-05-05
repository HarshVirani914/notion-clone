import { object, string } from "yup";

export const loginSchema = object({
  email: string().ensure().required().label("Email").default("").trim(),
  password: string().ensure().required().label("Password"),
}).required();
