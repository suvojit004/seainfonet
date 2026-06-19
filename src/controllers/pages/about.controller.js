const asyncHandler = require("../../utils/asyncHandler")
const ProductPage = require("../../models/productPage.model");
const Product = require("../../models/product.model");


const getAbout = asyncHandler(
    async (req, res) => {
      res.render('about',
        {
          navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
          productCardData: await Product.find().lean(),
          header: {
            title: "About | SEA Infonet | Leading IT Security Value Added Distributor in India",
            description: "Learn about SEA Infonet Pvt. Ltd., a leading cybersecurity value-added distributor in India.",
            canonical: "https://www.seainfonet.com/about"
          }
        })
    });

module.exports = {
    getAbout
}