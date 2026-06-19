const asyncHandler = require("../../utils/asyncHandler")
const ProductPage = require("../../models/productPage.model");
const Product = require("../../models/product.model");



const getIndex = asyncHandler(async (req, res, next) => {
    try {
        res.render('index', {
            productCardData: await Product.find().lean(),
            navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
            header: {
                title: "SEA Infonet PVT. LTD. - Leading IT Security Value Added Distributor in India",
                description: "SEA Infonet Pvt. Ltd. is a leading cybersecurity and IT security value-added distributor in India.",
                canonical: "https://www.seainfonet.com"
            }
        });
    } catch (error) {
        next(error)
    }

});


module.exports = {
    getIndex,
}