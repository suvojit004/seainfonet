const router = require("express").Router();
const ProductPage = require("../models/productPage.model");
const Product = require("../models/product.model");
const Event = require('../models/event.model');
const eventPageController = require("../controllers/pages/event.controller");
const indexPageController = require("../controllers/pages/index.controller");
const aboutPageController = require("../controllers/pages/about.controller");
const contactPageController = require("../controllers/pages/contact.controller");
const demoPageController = require ("../controllers/pages/demo.controller");
const privacyandTermsPageController = require ("../controllers/pages/privacy.terms.controller");
const partnerPageController = require ("../controllers/pages/partner.controller");
const productPageController = require ("../controllers/pages/product.controller");
const partnerProgramController = require ("../controllers/pages/partner.program.controller");



router.get('/',indexPageController.getIndex);

router.get('/about', aboutPageController.getAbout);

router.get('/partner', async (req, res) => {
  res.redirect('/partner-with-us');
});

router.get('/contact', contactPageController.getContact);

router.get('/demo', demoPageController.getDemo);

router.get('/product', productPageController.getAllProduct)

router.get('/product/:productKey', productPageController.getProductPageByKey);





router.get('/events', eventPageController.getAll);

router.get('/events/:slug', eventPageController.getBySlug);

router.get('/partner-with-us', partnerPageController.getPartner);
router.get ('/partner-education', partnerProgramController.getProgram)

router.get('/privacy-policy', privacyandTermsPageController.getPrivacy)
router.get('/terms-conditions', privacyandTermsPageController.getTerms)



router.get('/msp', async (req, res) => {
  res.render('msp', {
    navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
    productCardData: await Product.find().lean(),
    header: {
      title: "MSP | SEA Infonet | Leading IT Security Value Added Distributor in India",
      description: "Explore cybersecurity and managed security solutions for MSPs with SEA Infonet, a leading IT security value-added distributor in India.",
      canonical: "https://www.seainfonet.com/msp"

    }
  })

});

router.get('/resource', async (req, res) => {
  res.render('resource', {
    navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
    productCardData: await Product.find().lean(),
    header: {
      title: "Resources | SEA Infonet | Leading IT Security Value Added Distributor in India",
      description: "Access cybersecurity resources, product documents, solution guides, datasheets, and industry insights from SEA Infonet.",
      canonical: "https://www.seainfonet.com/resource",

    }
  })
});



module.exports = router;