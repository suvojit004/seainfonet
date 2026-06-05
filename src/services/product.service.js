const Product = require("../models/product.model");
const AppError = require("../utils/AppError");

const createProduct = async (data) => {
  const product = await Product.create(data);

  return product;
};

const getAllProducts = async () => {
  const products = await Product.find()
    .sort({ displayOrder: 1 });

  return products;
};

const getProductById = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError(
      "Product not found",
      404
    );
  }

  return product;
};

const updateProduct = async (
  id,
  data
) => {
  const product =
    await Product.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
      }
    );

  if (!product) {
    throw new AppError(
      "Product not found",
      404
    );
  }

  return product;
};

const deleteProduct = async (id) => {
  const product =
    await Product.findByIdAndDelete(id);

  if (!product) {
    throw new AppError(
      "Product not found",
      404
    );
  }

  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};