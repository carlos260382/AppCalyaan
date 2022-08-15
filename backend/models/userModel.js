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
    userfatherId: { type: String, required: false },
    userChildreId: [{ type: String, required: false }],
    numberPassword: {
      type: Number,
      default: random(100000, 999999),
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    pointsUser: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
