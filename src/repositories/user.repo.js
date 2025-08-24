import { User } from "../models/User.js";
export const findUserByEmail = (email) => User.findOne({ email });
export const findUserSafeById = (id) => User.findById(id).select("-password");
