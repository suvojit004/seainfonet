const asyncHandler =
  require(
    "../utils/asyncHandler"
  );

const productPageService =
  require(
    "../services/productPage.service"
  );

const createProduct = asyncHandler(
    async (req, res) => {

      const productPage =
        await productPageService.createProductPage(
          req.body
        );

      res.status(201).json({
        success: true,
        data: productPage
      });

    }
  );

const getAllProduct = asyncHandler(
    async (req, res) => {

      const productPages =
        await productPageService.getAllProductPages(
          req.query
        );

      res.status(200).json({
        success: true,
        count: productPages.length,
        data: productPages
      });

    }
  );

const getProductByKey =  asyncHandler(
    async (req, res) => {

      const productPage =
        await productPageService.getProductPageByKey(
          req.params.productKey
        );

      res.status(200).json({
        success: true,
        data: productPage
      });

    }
  );

const updateProductPage =
  asyncHandler(
    async (req, res) => {

      const productPage =
        await productPageService.updateProductPage(
          req.params.productKey,
          req.body
        );

      res.status(200).json({
        success: true,
        message:
          "Product page updated successfully",
        data: productPage
      });

    }
  );

const deleteProductPage =
  asyncHandler(
    async (req, res) => {

      await productPageService.deleteProductPage(
        req.params.productKey
      );

      res.status(200).json({
        success: true,
        message:
          "Product page deleted successfully"
      });

    }
  );

module.exports = {createProduct,getAllProduct,getProductByKey,updateProductPage, deleteProductPage}