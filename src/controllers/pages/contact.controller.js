const asyncHandler = require("../../utils/asyncHandler")
const ProductPage = require("../../models/productPage.model");
const Product = require("../../models/product.model");


const getContact = asyncHandler(
    async (req, res, next) => {
        try {
            res.render('contact', {
                navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
                productCardData: await Product.find().lean(),
                header: {
                    title: "Contact | SEA Infonet | Leading IT Security Value Added Distributor in India",
                    description: "Contact SEA Infonet Pvt. Ltd., a leading IT security and cybersecurity value-added distributor in India for partnerships, product inquiries, and business support.",
                    canonical: "https://www.seainfonet.com/contact"
                }
            })
        } catch (error) {
            next(error)
        }

    });

module.exports = {
    getContact
}