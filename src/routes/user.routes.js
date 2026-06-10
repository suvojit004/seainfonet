const router =
  require("express").Router();

const {
  createUser,getUsers,getUserById,updateUser
} = require("../controllers/user.controller");

const protect =
  require("../middlewares/auth.middleware");

const authorize =
  require("../middlewares/authorize.middleware");

const validate =
  require("../middlewares/validate.middleware");

const {
  createUserSchema, userIdSchema, updateUserSchema
} = require("../utils/user.validation");

router.post(
  "/",
  protect,
  authorize(
    "super_admin"
  ),
  validate(
    createUserSchema
  ),
  createUser
);

router.get(
  "/",
  protect,
  authorize(
    "super_admin",
    "admin"
  ),
  getUsers
);
router.get(
  "/:id",
  protect,
  authorize(
    "super_admin",
    "admin"
  ),
  validate(
    userIdSchema,
    "params"
  ),
  getUserById
);



router.patch(
  "/:id",
  protect,
  authorize("super_admin"),
  validate(userIdSchema, "params"),
  validate(updateUserSchema),
  updateUser
);


router.get("/", protect,authorize("super_admin", "admin"),getUsers);

module.exports = router;