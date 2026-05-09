const express = require("express");

const bcrypt = require("bcrypt");

const adminRoute = express.Router();
const ProductPage = require("../models/productPageSchema");

const { Admin } = require("../models/schema");

const authenticate = require(
  "../middleware/authenticate"
);





// LOGIN PAGE
adminRoute.get("/login", (req, res) => {

  res.render("admin/login");

});


// LOGIN POST
adminRoute.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const admin = await Admin.findOne({
      email
    });

    if (!admin) {

      return res.send("Invalid Email");

    }






    const match = await bcrypt.compare(
      password,
      admin.password
    );

    if (!match) {

      return res.send("Invalid Password");

    }






    // CREATE SESSION
    req.session.admin = {

      id: admin._id,

      email: admin.email

    };



    res.redirect("/admin/show");

  }

  catch (err) {

    console.log(err);

    res.send("Login Failed");

  }

});









// PROTECTED DASHBOARD
adminRoute.get(
  "/show",
  authenticate,
  async (req, res) => {
    let products = [];
    try {
        products = await ProductPage.find({}, {
        productKey: 1,
        _id: 0
      }).lean();

    } catch (error) {
      return res.send(error);
    }


    res.render("admin/show", {
      data: products
    });

  }
);











// LOGOUT
adminRoute.get(
  "/logout",
  authenticate,
  (req, res) => {

    req.session.destroy(() => {

      res.redirect("login");

    });

  }
);





module.exports = adminRoute;