const asyncHandler = require("../../utils/asyncHandler")
const ProductPage = require("../../models/productPage.model");
const Product = require("../../models/product.model");

const getDemo = asyncHandler(async (req, res, next) => {
    try {
        res.render('demo', {
            navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
            productCardData: await Product.find().lean(),
            header: {
                title: "Demo | SEA Infonet | Leading IT Security Value Added Distributor in India",
                description: "Request a cybersecurity product demo from SEA Infonet and explore enterprise IT security solutions for businesses, partners, and MSPs.",
                canonical: "https://www.seainfonet.com/demo"
            }
        })
    } catch (error) {
        next(error)
    }

});

module.exports = {
    getDemo
}