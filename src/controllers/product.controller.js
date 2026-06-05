const productService = require(
  "../services/product.service"
);

const asyncHandler = require(
  "../utils/asyncHandler"
);

const createProduct =
  asyncHandler(async (req, res) => {

    const product =
      await productService.createProduct(
        req.body
      );

    res.status(201).json({
      success: true,
      data: product,
    });

  });

const getAllProducts =
  asyncHandler(async (req, res) => {

    const products =
      await productService.getAllProducts();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });

  });

const getProduct =
  asyncHandler(async (req, res) => {

    const product =
      await productService.getProductById(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: product,
    });

  });

const updateProduct =
  asyncHandler(async (req, res) => {

    const product =
      await productService.updateProduct(
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      data: product,
    });

  });

const deleteProduct =
  asyncHandler(async (req, res) => {

    await productService.deleteProduct(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Product deleted successfully",
    });

  });

  module.exports = {createProduct, getAllProducts, getProduct, updateProduct, deleteProduct}