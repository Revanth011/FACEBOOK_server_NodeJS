const validator = require("validator");
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "firstName Required"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "lastName Required"],
    },
    userName: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "userName Required"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "email Required"],
      validate(Email) {
        if (!validator.isEmail(Email)) throw new Error("Invalid Email");
      },
    },
    password: {
      type: String,
      trim: true,
      required: [true, "password Required"],
    },
    accountVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
