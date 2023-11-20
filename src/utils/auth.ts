import jwt from "jsonwebtoken";
import * as yup from "yup";
import { PASSWORD_REGEX } from "./regex";

export const generateJWToken = (email: string) => {
  return jwt.sign(
    {
      data: email,
      // Expires after 4 hours
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
    },
    process.env.JWT_SECRET as string,
  );
};

export const LOGIN_SCHEMA = yup.object({
  email: yup.string().required("Email required").email("Invalid email"),
  password: yup.string().matches(PASSWORD_REGEX, "Invalid password"),
});
