const router = require("express").Router();
const protect =
  require("../middlewares/auth.middleware");
const validate =
  require("../middlewares/validate.middleware");
const authorize =
  require("../middlewares/authorize.middleware");
const {createProductPageSchema,updateProductPageSchema} = require('../utils/productPage.validation')
const  productPageController = require("../controllers/productPage.controller")



router.get("/",
  productPageController.getAllProduct,
)

router.get(
  "/:productKey",
  productPageController.getProductByKey
);

router.post("/",
  protect,
  authorize(
    "super_admin",
    "admin"
  ),
  validate(createProductPageSchema),
 productPageController.createProduct);


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