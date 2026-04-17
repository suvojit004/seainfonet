const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
});

const emailSchema = new mongoose.Schema({
    email: String,
})

const Product = mongoose.model("Product", productSchema);
const Email = mongoose.model("Email", emailSchema)

module.exports = {Product, Email};