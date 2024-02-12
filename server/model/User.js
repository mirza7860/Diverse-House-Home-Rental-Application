import mongoose from "mongoose";

const userschema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      unique: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileimagepath: {
      type: String,
      default: "",
    },
    triplist: {
      type: Array,
      default: [],
    },
    wishlist: {
      type: Array,
      default: [],
    },
    propertylist: {
      type: Array,
      default: [],
    },
    reservationlist: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userschema);

export default User;
