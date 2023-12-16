import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const choken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  res
    .status(statusCode)
    .cookie("choken", choken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
    })
    .json({
      success: true,
      message,
    });
};
