const express = require("express");
const routeCarousel = express.Router();
const {HomeCarousel} = require("../models/schema");

// CREATE
routeCarousel.post("/", async (req, res, next) => {
  try {
    const item = await HomeCarousel.create({ url: req.body.url });
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// READ
routeCarousel.get("/", async (req, res, next) => {
  try {
    const items = await HomeCarousel.find().sort({ createdAt: 1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// UPDATE
routeCarousel.put("/:id", async (req, res, next) => {
  try {
    const updated = await HomeCarousel.findByIdAndUpdate(
      req.params.id,
      { url: req.body.url },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).send("Not found");

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE
routeCarousel.delete("/:id", async (req, res, next) => {
  try {
    await HomeCarousel.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = routeCarousel;