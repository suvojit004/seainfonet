const router = require("express").Router();

const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  addNoteToLead,
  assignLead,
} = require(
  "../controllers/lead.controller"
);

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
  createLeadSchema,
  updateLeadSchema,
  addLeadNoteSchema,
  assignLeadSchema,
} = require(
  "../utils/lead.validation"
);

const {
  userIdSchema
} = require("../utils/user.validation");
router.post(
  "/",
  leadLimiter,
  validate(
    createLeadSchema
  ),
  createLead
);

router.get(
  "/",
  protect,
  authorize(
    "super_admin",
    "admin"
  ),
  getLeads
);

router.get("/:id",
    protect,
    authorize("super_admin", "admin"),
    validate(userIdSchema, "params"),
    getLeadById
)

router.patch("/:id",
    protect,
    authorize("super_admin", "admin"),
    validate(userIdSchema, "params"),
    validate(updateLeadSchema),
    updateLead
)

router.post(
  "/:id/notes",
  protect,
  authorize(
    "super_admin",
    "admin"
  ),
  validate(
    userIdSchema,
    "params"
  ),
  validate(
    addLeadNoteSchema
  ),
  addNoteToLead
);
router.patch(
  "/:id/assign",
  protect,
  authorize(
    "super_admin",
    "admin"
  ),
  validate(
    userIdSchema,
    "params"
  ),
  validate(
    assignLeadSchema
  ),
  assignLead
);
module.exports = router;