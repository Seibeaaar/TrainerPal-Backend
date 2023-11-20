import { Schema, model } from "mongoose";
import {
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from "@/utils/regex";
import { USER_ENUMS } from "@/utils/enums";
import bcrypt from "bcrypt";

const AuthProfileSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => EMAIL_REGEX.test(v),
      message: "Invalid email",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => PASSWORD_REGEX.test(v),
      message: "Invalid password",
    },
  },
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => NAME_REGEX.test(v),
      message: "Invalid first name",
    },
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => NAME_REGEX.test(v),
      message: "Invalid last name",
    },
  },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
  updatedAt: {
    type: String,
    default: new Date().toISOString(),
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => USERNAME_REGEX.test(v),
      message: "Invalid username",
    },
  },
  role: {
    type: String,
    enum: {
      values: USER_ENUMS.role,
    },
  },
  roleDocRef: {
    type: String,
  },
});

AuthProfileSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

export default model("AuthProfile", AuthProfileSchema);
