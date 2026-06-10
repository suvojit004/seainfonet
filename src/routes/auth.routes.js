const router = require("express").Router();

const { setupAdmin,login} = require("../controllers/auth.controller");
const protect = require("../middlewares/auth.middleware")
const authorize = require("../middlewares/authorize.middleware")
const validate = require ("../middlewares/validate.middleware")
const {loginSchema, setupAdminSchema,} = require("../utils/auth.validation")

router.post("/setup", validate(setupAdminSchema), setupAdmin);
router.post("/login", validate(loginSchema) ,login)

router.get(
  "/admin-only",
  protect,
  authorize("super_admin"),
  (req, res) => {
    res.json({
      success: true,
      message:
        "Welcome Super Admin"
    });
  }
);
module.exports = router;