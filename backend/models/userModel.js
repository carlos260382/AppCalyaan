import mongoose from "mongoose";
import { random } from "../utils.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isSeller: { type: Boolean, default: false, required: true },
    seller: {
      name: String,
      logo: String,
      description: String,
      rating: { type: Number, default: 0, required: true },
      numReviews: { type: Number, default: 0, required: true },
    },
    numberPassword: {
      type: Number,
      default: random(100000, 999999),
      required: false,
    },
    numberPhone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
