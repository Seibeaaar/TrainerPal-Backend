import jwt from "jsonwebtoken";
import * as yup from "yup";
import { PASSWORD_REGEX } from "./regex";

export const generateJWToken = (id: string) => {
  return jwt.sign(
    {
      id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
    },
    process.env.JWT_SECRET as string,
  );
};

export const LOGIN_SCHEMA = yup.object({
  email: yup.string().required("Email required").email("Invalid email"),
  password: yup.string().matches(PASSWORD_REGEX, "Invalid password"),
});
