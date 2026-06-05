
const ProductPage = require(
  "../../models/product"
);

const createProduct = async (
  req,
  res,
  next
) => {
    try {
        const exists = await ProductPage.findOne({
          productKey: req.body.productKey.toLowerCase()
        });
    
        if (exists) {
          return res.status(400).json({ message: "Product already exists" });
        }
    
        const item = await ProductPage.create(req.body);
    
        res.status(201).json({
          message: "Product page created successfully",
          data: item
        });
      } catch (err) {
        next(err);
      }
};

module.exports = {createProduct}