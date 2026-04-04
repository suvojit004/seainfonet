const {data,heroCrouselImg, productCard} = require("./Public/Javascript/data"); // Mimic Expernal database 

const express = require('express');
const path = require("path");

const app = express();
const multer = require("multer");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views');
const upload = multer();
app.use(express.static(path.join(__dirname, "Public")));
app.disable('x-powered-by');
const helmet = require('helmet');

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

app.post('/submit', upload.none(), (req, res) => {
  console.log("Form Data Received:");
  console.log(req.body);
  res.status(200).json({ message: "Form submitted successfully" });
});

app.get('/demo', (req, res) => {
  res.render('demo')
});
app.get('/test', (req, res) => {
  res.render('modals')
});


// custom 404
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
});

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


