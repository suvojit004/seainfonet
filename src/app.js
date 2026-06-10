

const express = require('express');
const mongoose = require("mongoose");
const helmet = require('helmet');
const path = require("path");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const cors = require("cors");
const routeProduct = require("./routes/product.routes");
const routeProductPage = require("./routes/productPage.routes");
const { globalLimiter } = require(
  "./middlewares/rateLimit.middleware"
);
const authRoute = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const leadRoutes = require("./routes/lead.routes");
const pageRoutes = require("./routes/page.routes")

const notFound = require(
  "./middlewares/notFound.middleware"
);

const errorHandler = require(
  "./middlewares/error.middleware"
);

const app = express();
const multer = require("multer");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(globalLimiter);
app.set('view engine', 'ejs');
app.set("view cache", false);
app.set('views', './views');

app.set("trust proxy", 2);

const upload = multer();
// app.use(express.static(path.join(__dirname, "Public")));
app.disable('x-powered-by');

//app.use(helmet());

app.use('/',pageRoutes)

app.use('/homeproduct', routeProduct);
app.use('/productpage', routeProductPage);

app.use("/createuser", authRoute);
app.use("/users", userRoutes);
app.use("/leads", leadRoutes);



app.use(notFound);
app.use(errorHandler);



module.exports = app;





