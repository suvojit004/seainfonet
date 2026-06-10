const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const AppError = require("../utils/AppError");

const createUser = async (
  payload
) => {

  const existingUser =
    await User.findOne({
      email: payload.email,
    });

  if (existingUser) {
    throw new AppError(
      "User already exists",
      409
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      payload.password,
      10
    );

  const user =
    await User.create({
      ...payload,
      password:
        hashedPassword,
    });

  return user;
};
const getUsers = async () => {
  const users = await User.find();
  if (users.length === 0) {
    throw new AppError(
      "User not found",
      404
    );}
  
    return users
};

const getUserById = async (id)=>{
    const user =  await User.findById(id)
    if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }
  return user;
}



const updateUser = async (
  userId,
  payload
) => {

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  const allowedFields = [
    "firstName",
    "lastName",
    "role",
    "isActive",
  ];

  Object.keys(payload).forEach(
    (key) => {
      if (
        allowedFields.includes(key)
      ) {
        user[key] = payload[key];
      }
    }
  );
  

  await user.save();

  return user;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser
};