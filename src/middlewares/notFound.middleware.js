const notFound = (req, res, next) => {
  const error = new Error(
    `Route not found - ${req.originalUrl}`
  );

  next(error);
};

module.exports = notFound;