const express = require("express");
const routeProductScenario = express.Router();
const {HomeProductScenario} = require("../models/schema");


// CREATE
routeProductScenario.post("/", async (req, res, next) => {
  try {
    const count = await HomeProductScenario.countDocuments();

    if (count >= 3) {
      return res.status(400).json({
        message: "Maximum 3 entries allowed"
      });
    }

    const item = await HomeProductScenario.create(req.body);

    res.json(item);
  } catch (err) {
    next(err);
  }
});


// READ
routeProductScenario.get("/", async (req, res, next) => {
  try {
    const items = await HomeProductScenario.find();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// UPDATE
routeProductScenario.put("/:id", async (req, res, next) => {
  try {
    const updated = await HomeProductScenario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).send("Not found");

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE
routeProductScenario.delete("/:id", async (req, res, next) => {
  try {
    await HomeProductScenario.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (err) {
    next(err);
  }
});



module.exports = routeProductScenario;