const asyncHandler = require("../../utils/asyncHandler")
const ProductPage = require("../../models/productPage.model");
const Product = require("../../models/product.model");


const getPrivacy = asyncHandler(
    async (req, res, next) => {
        try {
            res.render('privacy-policy', {
                navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
                productCardData: await Product.find().lean(),
                header: {
                    title: "Privacy Policy | SEA Infonet | Leading IT Security Value Added Distributor in India",
                    description: "Read the Privacy Policy of SEA Infonet Pvt. Ltd. to understand how we collect, use, and protect user and business partner information.",
                    canonical: "https://www.seainfonet.com/privacy-policy"
                }
            })
        } catch (error) {
            next(error)
        }

    }
);

const getTerms = asyncHandler(
    async (req, res, next) => {
        try {
            res.render('terms-conditions', {
                navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
                productCardData: await Product.find().lean(),
                header: {
                    title: "Terms & Conditions | SEA Infonet | Leading IT Security Value Added Distributor in India",
                    description: "Read the Terms & Conditions governing the use of the SEA Infonet website, services, and business interactions.",
                    canonical: "https://www.seainfonet.com/terms-conditions"
                }
            })
        } catch (error) {
            next(error)
        }

    }
);

module.exports = {
    getPrivacy,
    getTerms,
}