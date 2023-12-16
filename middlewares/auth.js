import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { choken } = req.cookies;
  if (!choken) {
    return res.status(404).json({
      success: false,
      message: "Login first",
    });
  }
  const decoded = jwt.verify(choken, process.env.SECRET_KEY);
  req.user = await User.findById({ _id: decoded._id });
  next();
};
