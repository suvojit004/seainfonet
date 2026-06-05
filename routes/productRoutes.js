const express = require("express");
const routeProduct = express.Router();
const {HomeProduct} = require("../models/schema");
const authenticate = require(
  "../src/middlewares/authenticate"
);


// CREATE
routeProduct.post("/",authenticate, async (req, res, next) => {
  try {
    const item = await HomeProduct.create(req.body);
    res.json(item);
  } catch (err) {
    next(err);
  }
});


// READ
routeProduct.get("/", async (req, res, next) => {
  try {
    const items = await HomeProduct.find();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// UPDATE
routeProduct.put("/:id",authenticate, async (req, res, next) => {
  try {
    
    const updated = await HomeProduct.findByIdAndUpdate(
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
routeProduct.delete("/:id",authenticate, async (req, res, next) => {
  try {
    await HomeProduct.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (err) {
    next(err);
  }
});




module.exports = routeProduct;