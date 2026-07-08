const asyncHandler = require("../../utils/asyncHandler");
const ProductPage = require("../../models/productPage.model");
const Product = require("../../models/product.model");

const getResource = asyncHandler(
    async (req, res, next) => {
            try {
                 res.render('resource', {
                    navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
                    productCardData: await Product.find().lean(),
                    header: {
                      title: "Resources | SEA Infonet | Leading IT Security Value Added Distributor in India",
                      description: "Access cybersecurity resources, product documents, solution guides, datasheets, and industry insights from SEA Infonet.",
                      canonical: "https://www.seainfonet.com/resource",
                
                    }
                  })
            } catch (error) {
                next(error)
            }
    
        });

module.exports = {getResource};