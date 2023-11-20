import dayjs from "dayjs";

export const USER_SCHEMA = {
  dateOfBirth: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => {
        if (!dayjs(v).isValid()) {
          return false;
        }
        return dayjs().diff(dayjs(v), "year") >= 13;
      },
      message: "You must be 13 or older",
    },
  },
  preferredSite: {
    type: String,
    required: true,
    enum: {
      values: ["online", "offline"],
    },
  },
  bio: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => v.length <= 512,
    },
  },
  photos: {
    type: [String],
  },
};
