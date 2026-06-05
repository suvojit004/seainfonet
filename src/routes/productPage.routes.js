const router = require("express").Router();
const protect =
  require("../middlewares/auth.middleware");
const validate =
  require("../middlewares/validate.middleware");
const {createProductPageSchema} = require('../utils/productPage.validation')
const  {createProduct} = require("../controllers/productPage.controller")

router.post("/",
  protect,
  validate(createProductPageSchema),
 createProduct)

module.exports = router;