const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler")
const {verifyAccessToken} = require("../utils/jwt")

const protect = asyncHandler(
  async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      throw new AppError(
        "Authentication required",
        401
      );
    }

    const token = authHeader.replace("Bearer ", "").trim();
  

    const decoded =
      verifyAccessToken(token);

    const user =
      await User.findById(
        decoded.userId
      ).select("-password");

    if (!user) {
      throw new AppError(
        "User not found",
        401
      );
    }

    req.user = user;

    next();
  }
);
module.exports = protect;