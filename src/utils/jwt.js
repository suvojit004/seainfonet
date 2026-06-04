const jwt = require("jsonwebtoken");
const AppError = require("./AppError")

const generateAccessToken = (payload) => {
   
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn:
        process.env.JWT_EXPIRES_IN || "1d",
    }
  );
};

const verifyAccessToken = (token) => {
    
  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET
    );
  } catch {
    throw new AppError(
      "Invalid or expired token",
      401
    );
  }
};

module.exports = {
  generateAccessToken,
  verifyAccessToken
};