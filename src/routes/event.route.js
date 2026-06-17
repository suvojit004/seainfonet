const router = require("express").Router();

const validate =
  require("../middlewares/validate.middleware");

const protect =
  require("../middlewares/auth.middleware");

const authorize =
  require("../middlewares/authorize.middleware");

const eventController = require("../controllers/event.controller");

const {
  createEventSchema,
  updateEventSchema,
  eventQuerySchema,
} = require("../utils/event.validation");


router.get(
  "/",
  validate(eventQuerySchema, "query"),
  eventController.getAll
);

router.get(
  "/upcoming",
  validate(eventQuerySchema, "query"),
  eventController.getUpcoming
);

router.get(
  "/:slug",
  eventController.getBySlug
);


router.post(
  "/",
  protect,
  authorize(
    "super_admin",
    "admin"
  ),
  validate(createEventSchema),
  eventController.create
);

router.put(
  "/:slug",
  protect,
  authorize(
    "super_admin",
    "admin"
  ),
  validate(updateEventSchema),
  eventController.update
);

router.delete(
  "/:slug",
  protect,
  authorize(
    "super_admin",
    "admin"
  ),
  eventController.remove
);


module.exports = router;