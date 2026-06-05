const express = require("express");
const routeProductPage = express.Router();
const ProductPage = require("../src/models/productPage.model");
const authenticate = require(
  "../src/middlewares/authenticate"
);
const productController = require(
  "../src/controllers/productPage.controller"
);

// CREATE
routeProductPage.post("/", authenticate, productController.createProduct);


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
routeProductPage.put("/:productKey",authenticate, async (req, res, next) => {
  const data = req.body
 try {
    const updated = await ProductPage.findOneAndUpdate(
      { productKey: req.params.productKey.toLowerCase() },
       {
        $set: req.body
      },
      { returnDocument: 'after', runValidators: true }
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
routeProductPage.delete("/:productKey",authenticate, async (req, res, next) => {
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