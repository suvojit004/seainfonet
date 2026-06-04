const AppError = require("../utils/AppError")
const notFound = (req, res, next) => {
  const error = new AppError(
    `Route not found - ${req.originalUrl}`, 404
  );

  next(error);
};

module.exports = notFound;