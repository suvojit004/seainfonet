const { ZodError } = require("zod");
const ProductPage = require("../models/productPageSchema")

const errorHandler =async (err, req, res, next) => {

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

  const statusCode = err.statusCode || 500;

  const message = err.message || "Internal Server Error";
  if (statusCode === 404) {
    res.status(statusCode).render('404', {
      navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
      header: {
        title: "404 - Page Not Found | SEA Infonet",
        description: "The page you are looking for could not be found.",
        robots: "noindex, follow"
      }
    })
  }
  else if (statusCode => 500) {
    res.status(statusCode).render('5xx', {
      navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
      header: {
        title: `${statusCode} - Server Error | SEA Infonet`,
        description: "Internal Server Error",
        robots: "noindex, follow"
      }
    })
  } else{
  res.status(statusCode).json({
    success: false,
    message,
  });}
};

module.exports = errorHandler;