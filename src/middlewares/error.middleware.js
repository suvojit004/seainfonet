const { ZodError } = require("zod");

const errorHandler = (err, req, res, next) => {

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      errors: err.issues.map(
        (issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })
      ),
    });
  }

  const statusCode =
    err.statusCode || 500;

  const message =
    err.message ||
    "Internal Server Error";


  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;