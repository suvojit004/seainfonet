const express = require("express");
const routeProductPage = express.Router();
const ProductPage = require("../models/productPageSchema");


// CREATE
routeProductPage.post("/", async (req, res, next) => {
  try {
    const exists = await ProductPage.findOne({
      productKey: req.body.productKey.toLowerCase()
    });

    if (exists) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const item = await ProductPage.create(req.body);

    res.status(201).json({
      message: "Product page created successfully",
      data: item
    });
  } catch (err) {
    next(err);
  }
});


// READ ALL
routeProductPage.get("/", async (req, res, next) => {
  try {
    const items = await ProductPage.find().sort({ createdAt: -1 });

    res.json(items);
  } catch (err) {
    next(err);
  }
});


// READ ONE
routeProductPage.get("/:productKey", async (req, res, next) => {
  try {
    const item = await ProductPage.findOne({
      productKey: req.params.productKey.toLowerCase()
    });

    if (!item) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(item);
  } catch (err) {
    next(err);
  }
});


// UPDATE
routeProductPage.put("/:productKey", async (req, res, next) => {
  try {
    const updated = await ProductPage.findOneAndUpdate(
      { productKey: req.params.productKey.toLowerCase() },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product page updated successfully",
      data: updated
    });
  } catch (err) {
    next(err);
  }
});


// DELETE
routeProductPage.delete("/:productKey", async (req, res, next) => {
  try {
    const deleted = await ProductPage.findOneAndDelete({
      productKey: req.params.productKey.toLowerCase()
    });

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product page deleted successfully" });
  } catch (err) {
    next(err);
  }
});


module.exports = routeProductPage;