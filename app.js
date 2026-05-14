const { data, heroCrouselImg, productCard, OfferPorduct } = require("./Public/Javascript/data"); // Mimic Expernal database 

const express = require('express');
const mongoose = require("mongoose");
const helmet = require('helmet');
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");

const { Product, Email } = require("./models/product");
const { HomeCarousel, HomeProduct, HomeProductScenario, SocialMedia, ContactForm, DemoForm, Admin} = require("./models/schema");
const routeCarousel = require("./routes/carouselRoutes");
const routeProductScenario = require("./routes/productScenarioRoutes");
const routeProduct = require("./routes/productRoutes");
const routeProductPage = require("./routes/productPageRoutes");
const routeForms = require("./routes/formRoutes");
const ProductPage = require("./models/productPageSchema");
const routeAdmin = require("./routes/admin")

const authenticate = require(
  "./middleware/authenticate"
);


const app = express();
const multer = require("multer");
app.use(session({

  secret: "seainfonet2126",

  resave: false,

  saveUninitialized: false,

  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }

}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set("view cache", false);
app.set('views', './views');
const upload = multer();
// app.use(express.static(path.join(__dirname, "Public")));
app.disable('x-powered-by');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));



//app.use(helmet({
//    strictTransportSecurity: false,
//  }));
/*const data = {
  title : "Kaspersky",
  description : "Antivirus",
  url : "../Images/ProductImage/product1.jpg"
}*/

const port = 3000;

app.get('/', async (req, res) => {
 
  res.render('index', {
    productSenario: await HomeProductScenario.find(),
    heroImg: await HomeCarousel.find(),
    productCardData: chunkArray(await HomeProduct.find()),
    navData: await ProductPage.find({status: "published"}).select("productKey -_id").lean()
  });


});

app.get('/about', async(req, res) => {
  res.render('about', {navData: await ProductPage.find({status: "published"}).select("productKey -_id").lean()})
});
app.get('/contact', async(req, res) => {
  res.render('contact',{navData: await ProductPage.find({status: "published"}).select("productKey -_id").lean()})
});

app.post('/submit', upload.none(), async (req, res) => {
  console.log("Form Data Received:");
  if (req.body.product) {
    await new DemoForm({...req.body}).save();

  }
  else {
    await new ContactForm({ name: `${req.body.name}`, number: `${req.body.number}`, email: `${req.body.email}`, subject: `${req.body.subject}`, description: `${req.body.description}` }).save();
  }
  res.status(200).json({ message: "Form submitted successfully" });
});

app.get('/demo', async (req, res) => {
  res.render('demo', {navData: await ProductPage.find({status: "published"}).select("productKey -_id").lean()})
});

/*app.get('/admin/show', authenticate,async (req, res) => {
  res.render('admin/show');
})
*/
app.get('/product/:productKey', async (req, res, next) => {
  try {
    const key = req.params.productKey.toLowerCase();
    const item = await ProductPage.findOne({ productKey: key });
    if (!item) {
      return res.status(404).render('404');
    }
    res.render('product', { data: item, navData: await ProductPage.find({status: "published"}).select("productKey -_id").lean() })
  } catch (err) {
    next(err);
  }

});

app.get('/msp', async (req, res) => {
  res.render('msp',{navData: await ProductPage.find({status: "published"}).select("productKey -_id").lean()})

});

app.get('/resource', async (req, res) => {
  res.render('resource',{navData: await ProductPage.find({status: "published"}).select("productKey -_id").lean()})
});

app.use('/carousel', routeCarousel);
app.use('/productscenario', routeProductScenario);
app.use('/homeproduct', routeProduct);
app.use('/productpage', routeProductPage);
app.use('/form', authenticate, routeForms);
app.use('/admin',routeAdmin );


// custom 404
app.use(async (req, res, next) => {
  res.status(404).render('404',{navData: await ProductPage.find({status: "published"}).select("productKey -_id").lean()})
});

// custom error handler
app.use(async (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render('5xx',{navData: await ProductPage.find({status: "published"}).select("productKey -_id").lean()})
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


function chunkArray(arr, size = 3) {
  const result = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}

/* Temporary Funtion*/

async function createAdmin() {

  try {

    const exists = await Admin.findOne({
      email: "admin@test.com"
    });

    if (exists) {

      console.log("Admin already exists");

      return

    }

    const hashedPassword =
      await bcrypt.hash("123456", 10);

    await Admin.create({

      email: "admin@test.com",

      password: hashedPassword

    });

    console.log("Admin Created");

    return

  }

  catch (err) {

    console.log(err);
    return

  }

}





createAdmin();

/* Temporary Funtion End*/