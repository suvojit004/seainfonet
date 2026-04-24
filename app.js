const { data, heroCrouselImg, productCard, OfferPorduct } = require("./Public/Javascript/data"); // Mimic Expernal database 

const express = require('express');
const mongoose = require("mongoose");
const helmet = require('helmet');
const path = require("path");
const { Product, Email } = require("./models/product");
const { HomeCarousel, HomeProduct, HomeProductScenario, SocialMedia, ContactForm, DemoForm } = require("./models/schema");
const routeCarousel = require("./routes/carouselRoutes");

const app = express();
const multer = require("multer");
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
    productSenario: data,
    heroImg: await HomeCarousel.find(),
    productCardData: productCard,
    navData: OfferPorduct
  });

});

app.get('/about', (req, res) => {
  res.render('about', { navData: OfferPorduct })
});
app.get('/contact', (req, res) => {
  res.render('contact', { navData: OfferPorduct })
});

app.post('/submit', upload.none(), async (req, res) => {
  console.log("Form Data Received:");
  if (req.body.product) {
    await new DemoForm({ name: `${req.body.name}`, number: `${req.body.phone}`, product: `${req.body.product}`, email: `${req.body.email}`, subject: `${req.body.subject}`, description: `${req.body.description}` }).save();
  }
  else {
    await new ContactForm({ name: `${req.body.name}`, number: `${req.body.phone}`, email: `${req.body.email}`, subject: `${req.body.subject}`, description: `${req.body.description}` }).save();
  }
  res.status(200).json({ message: "Form submitted successfully" });
});

app.get('/demo', (req, res) => {
  res.render('demo', { navData: OfferPorduct })
});

app.get('/admin', async (req, res) => {
  const formData = [await DemoForm.find(), await ContactForm.find()].flat();
  res.render('admin', {data: formData});
})

app.get('/login', (req, res) => {
  res.redirect('/admin')
})

app.get('/msp', (req, res) => {
  res.render('msp', { navData: OfferPorduct })

});
app.get('/product', (req, res) => {
  res.render('product', { navData: OfferPorduct })
});
app.get('/resource', (req, res) => {
  res.render('resource', { navData: OfferPorduct })
});

app.use('/carousel',routeCarousel);


// custom 404
app.use((req, res, next) => {
  res.status(404).render('404', { navData: OfferPorduct })
});

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render('5xx', { navData: OfferPorduct })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


