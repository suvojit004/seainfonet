const express = require("express");

const router = express.Router();

const {
  leadLimiter,
} = require("../middlewares/rateLimit.middleware");


const validate =
  require("../middlewares/validate.middleware");

const protect =
  require("../middlewares/auth.middleware");

const authorize =
  require("../middlewares/authorize.middleware");



const {
  createPartnerInquirySchema,
  updateStatusSchema,
} = require(
  "../utils/partnerInquiry.validation"
);

const {
  createPartnerInquiry,
  getPartnerInquiries,
  getPartnerInquiry,
  updateStatus,
} = require(
  "../controllers/partnerInquiry.controller"
);

// Public Form Submission
router.post(
  "/",
  leadLimiter,
  validate(
    createPartnerInquirySchema
  ),
  createPartnerInquiry
);

// Admin Routes
router.get(
  "/",
  protect,
  authorize(
    "super_admin",
    "admin"
  ),
  getPartnerInquiries
);

router.get(
  "/:id",
  protect,
  authorize(
    "super_admin",
    "admin"
  ),
  getPartnerInquiry
);

router.patch(
  "/:id/status",
  protect,
  authorize(
    "super_admin",
    "admin"
  ),
  validate(
    updateStatusSchema
  ),
  updateStatus
);

module.exports = router;