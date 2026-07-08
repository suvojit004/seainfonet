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
const resourcePageController = require("../controllers/pages/resource.controller")



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

router.get('/resource', resourcePageController.getResource);



module.exports = router;