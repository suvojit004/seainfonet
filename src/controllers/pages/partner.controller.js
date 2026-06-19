const asyncHandler = require("../../utils/asyncHandler")
const ProductPage = require("../../models/productPage.model");
const Product = require("../../models/product.model");

const getPartner = asyncHandler(
    async (req, res, next) => {
        try {
            res.render('partner-with-us', {
                navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
                productCardData: await Product.find().lean(),
                header: {
                    title: "Partner With Us | SEA Infonet | Leading IT Security Value Added Distributor in India",
                    description: "Join SEA Infonet's partner network and gain access to world-class cybersecurity solutions, vendor partnerships, technical training, pre-sales support, and business growth opportunities across India.",
                    canonical: "https://www.seainfonet.com/partner-with-us"

                },
            });
        } catch (error) {
            next(error)
        }

    }
);

module.exports = {
    getPartner
}