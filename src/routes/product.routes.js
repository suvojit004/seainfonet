const express = require("express");

const router = express.Router();

const productController = require(
  "../controllers/product.controller"
);
const authorize =
  require("../middlewares/authorize.middleware");

const protect = require(
  "../middlewares/auth.middleware"
);

const validate = require(
  "../middlewares/validate.middleware"
);

const {
  createProductSchema,
  updateProductSchema,
} = require("../utils/product.validation");

router
  .route("/")
  .get(
    productController.getAllProducts
  )
  .post(
    protect,
    validate(createProductSchema),
    productController.createProduct
  );

router
  .route("/:id")
  .get(
    productController.getProduct
  )
  .patch(
    protect,
    authorize(
    "super_admin",
    "admin"
  ),
    validate(updateProductSchema),
    productController.updateProduct
  )
  .delete(
    protect,
    authorize(
    "super_admin",
    "admin"
  ),
    productController.deleteProduct
  );


module.exports = router;