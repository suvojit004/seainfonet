const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { generateAccessToken,} = require("../utils/jwt");
const AppError = require("../utils/AppError")


const createInitialAdmin = async (payload) => {
  const existingUser = await User.findOne();

  if (existingUser) {
    throw new AppError(
      "Initial admin already exists", 409
    );
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    firstName: payload.firstName,
    lastName : payload.lastName,
    email: payload.email,
    password: hashedPassword,
    role: "super_admin",
  });

  return user;
};

const loginUser = async ({ email, password,}) => {
  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    throw new AppError("User Does not Exist", 404);
  }

  if (!user.isActive) {
  throw new AppError(
    "User account is inactive",
    403
  );
}

  const isPasswordMatched =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordMatched) {
    throw new AppError("Invalid credentials", 401);
  }

  const accessToken =
    generateAccessToken({
      userId: user._id,
      role: user.role,
    });

  return {
    accessToken,
    user,
  };
};


module.exports = {
  createInitialAdmin,
  loginUser
};