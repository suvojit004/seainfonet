const ProductPage = require(
  "../models/productPage.model"
);

const AppError = require(
  "../utils/AppError"
);


const createProductPage = async (
  data
) => {
    const exists =
    await ProductPage.findOne({
      productKey:
        data.productKey
    });

  if (exists) {
    throw new AppError(
      "Product page already exists",
      400
    );
  }

  return ProductPage.create(data);
};

module.exports = {createProductPage}