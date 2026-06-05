const asyncHandler =
  require(
    "../utils/asyncHandler"
  );

const {createProductPage} =
  require(
    "../services/productPage.service"
  );

const createProduct = asyncHandler(
    async (req, res) => {

      const productPage =
        await createProductPage(
          req.body
        );

      res.status(201).json({
        success: true,
        data: productPage
      });

    }
  );

module.exports = {createProduct}