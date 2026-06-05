const rateLimit = require("express-rate-limit");
const AppError = require("../utils/AppError");

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(
      new AppError(
        "Too many requests. Please try again later.",
        429
      )
    );
  },
});

const leadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(
      new AppError(
        "Too many form submissions. Please try again later",
        429
      )
    );
  },
});

module.exports = {
  globalLimiter,
  leadLimiter,
};