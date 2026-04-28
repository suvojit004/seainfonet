const express = require("express");
const routeForms = express.Router();
const {ContactForm, DemoForm} = require("../models/schema");


// READ ALL
routeForms.get("/contactform", async (req, res, next) => {
  try {
    const items = await ContactForm.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// READ ONE
routeForms.get("/contactform/:id", async (req, res, next) => {
  try {
    const item = await ContactForm.findById(req.params.id);

    if (!item) return res.status(404).send("Not found");

    res.json(item);
  } catch (err) {
    next(err);
  }
});

// UPDATE
routeForms.put("/contactform/:id", async (req, res, next) => {
  try {
    const updated = await ContactForm.findByIdAndUpdate(
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
routeForms.delete("/contactform/:id", async (req, res, next) => {
  try {
    const deleted = await ContactForm.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).send("Not found");

    res.send("Deleted");
  } catch (err) {
    next(err);
  }
});


/* =========================
   DEMO FORM CRUD
========================= */


// READ ALL
routeForms.get("/demoform", async (req, res, next) => {
  try {
    const items = await DemoForm.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// READ ONE
routeForms.get("/demoform/:id", async (req, res, next) => {
  try {
    const item = await DemoForm.findById(req.params.id);

    if (!item) return res.status(404).send("Not found");

    res.json(item);
  } catch (err) {
    next(err);
  }
});

// UPDATE
routeForms.put("/demoform/:id", async (req, res, next) => {
  try {
    const updated = await DemoForm.findByIdAndUpdate(
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
routeForms.delete("/demoform/:id", async (req, res, next) => {
  try {
    const deleted = await DemoForm.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).send("Not found");

    res.send("Deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = routeForms;