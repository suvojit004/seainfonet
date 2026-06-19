const asyncHandler = require("../../utils/asyncHandler")
const ProductPage = require("../../models/productPage.model");
const Product = require("../../models/product.model");

const getPartner = asyncHandler (
    async (req, res) => {
      res.render('partner-with-us', {
        navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
        productCardData: await Product.find().lean(),
        header: {
          title: "MSP | SEA Infonet | Leading IT Security Value Added Distributor in India",
          description: "Explore cybersecurity and managed security solutions for MSPs with SEA Infonet, a leading IT security value-added distributor in India.",
          canonical: "https://www.seainfonet.com/msp"
    
        },
      });
    }
);

module.exports = {
    getPartner
}