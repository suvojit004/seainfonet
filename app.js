const {data,heroCrouselImg, productCard} = require("./Public/Javascript/data"); // Mimic Expernal database 

const express = require('express');
const mongoose = require("mongoose");
const helmet = require('helmet');
const path = require("path");
const {Product, Email} = require("./models/product")

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

app.get('/', (req, res) => {
  res.render('index', {
    productSenario: data,
    heroImg : heroCrouselImg,
    productCardData : productCard
  });
});

app.get('/about', (req, res) => {
  res.render('about')
});
app.get('/contact', (req, res) => {
  res.render('contact')
});

app.post('/submit', upload.none(), async (req, res) => {
  console.log("Form Data Received:");
  await new Email({email:`${req.body.email}`}).save();
  res.status(200).json({ message: "Form submitted successfully" });
});

app.get('/demo', (req, res) => {
  res.render('demo')
});
app.get('/test', async (req, res) => {
  res.send(await Email.find());

});

app.get('/msp',(req,res)=>{
  res.render('msp')

});
app.get('/product',(req,res)=>{
  res.render('product')
});
app.get('/resource',(req,res)=>{
  res.render('resource')
});




// custom 404
app.use((req, res, next) => {
  res.status(404).render('404')
});

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render('5xx')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


