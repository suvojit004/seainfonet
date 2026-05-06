const express = require("express");

const bcrypt = require("bcrypt");

const adminRoute = express.Router();

const {Admin} = require("../models/schema");

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

    res.render("admin/show");

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