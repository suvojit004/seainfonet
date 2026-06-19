const asyncHandler = require("../../utils/asyncHandler")
const ProductPage = require("../../models/productPage.model");
const Product = require("../../models/product.model");


const getAllProduct = asyncHandler(
    async (req, res, next) => {
      try {
        const data = await ProductPage.find({ status: "published" }).select('hero productKey -_id').lean();
    
        res.render('product', {
          data: data, 
          navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
          productCardData: await Product.find().lean(),
          header: {
            title: `Product | SEA Infonet | Leading IT Security Value Added Distributor in India`,
            description: "Explore cybersecurity and IT security products distributed by SEA Infonet including endpoint security, backup, email security, and enterprise protection solutions.",
            canonical: `https://www.seainfonet.com/product`
          }
        });
    
      } catch (err) {
    
        next(err)
      }
    }
);
const getProductPageByKey = asyncHandler(
    async (req, res, next) => {
      try {
        const key = req.params.productKey.toLowerCase();
        const item = await ProductPage.findOne({ productKey: key });
        if (!item) {
          return res.status(404).render('404');
        }
        res.render('productPage', {
          data: item, navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
          productCardData: await Product.find().lean(),
          header: {
            title: `${key} | SEA Infonet | Leading IT Security Value Added Distributor in India`,
            description: "Explore cybersecurity and IT security products distributed by SEA Infonet including endpoint security, backup, email security, and enterprise protection solutions.",
            canonical: `https://www.seainfonet.com/product/${key}`
          }
        })
      } catch (err) {
        next(err);
      }
    
    }
);


module.exports = {
    getAllProduct,
    getProductPageByKey,

}