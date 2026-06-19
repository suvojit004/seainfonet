const asyncHandler = require("../../utils/asyncHandler")
const ProductPage = require("../../models/productPage.model");
const Product = require("../../models/product.model");

const getProgram = asyncHandler(
    async (req, res, next) => {
        try {
            res.render('partner-program', {
                navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
                productCardData: await Product.find().lean(),
                header: {
                    title: "Partner Program | SEA Infonet | Leading Cybersecurity Distributor in India",
                    description: "Become a SEA Infonet partner and accelerate growth with industry-leading cybersecurity solutions. Access vendor partnerships, technical training, pre-sales support, marketing resources, and dedicated channel enablement from India's leading cybersecurity distributor.",
                    canonical: "https://www.seainfonet.com/partner-program'"

                },
            });
        } catch (error) {
            next(error)
        }

    }
);

module.exports = {
    getProgram
}