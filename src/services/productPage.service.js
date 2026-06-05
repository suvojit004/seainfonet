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
      409
    );
  }

  return ProductPage.create(data);
};

const getAllProductPages = async (
  filters
) => {

  const query = {};

  if (filters.status) {
    query.status = filters.status;
  }

  const productPages =
    await ProductPage
      .find(query)
      .sort({ createdAt: -1 });

  return productPages;
};

const getProductPageByKey = async (
  productKey
) => {
  return findProductPageByKey(productKey);
};


const updateProductPage = async (
  productKey,
  data
) => {

  const updated =
    await ProductPage.findOneAndUpdate(
      {
        productKey:
          productKey.toLowerCase()
      },
      {
        $set: data
      },
      {
        new: true,
        runValidators: true
      }
    );

  if (!updated) {
    throw new AppError(
      "Product page not found",
      404
    );
  }

  return updated;
};

const deleteProductPage = async (
  productKey
) => {

  const deleted =
    await ProductPage.findOneAndDelete({
      productKey:
        productKey.toLowerCase()
    });

  if (!deleted) {
    throw new AppError(
      "Product page not found",
      404
    );
  }

  return deleted;
};

const findProductPageByKey =
  async (productKey) => {

    const productPage =
      await ProductPage.findOne({
        productKey:
          productKey.toLowerCase()
      });

    if (!productPage) {
      throw new AppError(
        "Product page not found",
        404
      );
    }

    return productPage;
};

module.exports = {createProductPage, getAllProductPages, getProductPageByKey,updateProductPage,deleteProductPage}