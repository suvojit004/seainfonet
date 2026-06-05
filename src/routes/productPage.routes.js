const router = require("express").Router();
const protect =
  require("../middlewares/auth.middleware");
const validate =
  require("../middlewares/validate.middleware");
const authorize =
  require("../middlewares/authorize.middleware");
const {createProductPageSchema,updateProductPageSchema} = require('../utils/productPage.validation')
const  productPageController = require("../controllers/productPage.controller")

router.post("/",
  protect,
  authorize(
    "super_admin",
    "admin"
  ),
  validate(createProductPageSchema),
 productPageController.createProduct)

router.get("/",
    protect,
  authorize(
    "super_admin",
    "admin"
  ),
  productPageController.getAllProduct,
)

router.get(
  "/:productKey",
  protect,
  authorize(
    "super_admin",
    "admin"
  ),
  productPageController.getProductByKey
);

router.patch(
  "/:productKey",
  protect,
  authorize(
    "super_admin",
    "admin"
  ),
  validate(updateProductPageSchema),
  productPageController.updateProductPage
);

router.delete(
  "/:productKey",
  protect,
  productPageController.deleteProductPage
);

module.exports = router;