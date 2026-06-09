

const express = require('express');
const mongoose = require("mongoose");
const helmet = require('helmet');
const path = require("path");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const cors = require("cors");
const Product = require("./models/product.model");

const routeProduct = require("./routes/product.routes");
const routeProductPage = require("./routes/productPage.routes");
const ProductPage = require("./models/productPage.model");

const { globalLimiter } = require(
  "./middlewares/rateLimit.middleware"
);

const authRoute = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const leadRoutes = require("./routes/lead.routes");

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


const port = 3000;

app.get('/', async (req, res) => {

  res.render('index', {
   
    productCardData: await Product.find().lean(),
    navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
    header: {
      title: "SEA Infonet PVT. LTD. - Leading IT Security Value Added Distributor in India",
      description: "SEA Infonet Pvt. Ltd. is a leading cybersecurity and IT security value-added distributor in India.",
      canonical: "https://www.seainfonet.com"
    }
  });


});

app.get('/about', async (req, res) => {
  res.render('about',
    {
      navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
      productCardData: await Product.find().lean(),
      header: {
        title: "About | SEA Infonet | Leading IT Security Value Added Distributor in India",
        description: "Learn about SEA Infonet Pvt. Ltd., a leading cybersecurity value-added distributor in India.",
        canonical: "https://www.seainfonet.com/about"
      }
    })
});

app.get('/partner', async (req, res) => {
  res.redirect('/contact');
});

app.get('/contact', async (req, res) => {
  res.render('contact', {
    navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
    productCardData: await Product.find().lean(),
    header: {
      title: "Contact | SEA Infonet | Leading IT Security Value Added Distributor in India",
      description: "Contact SEA Infonet Pvt. Ltd., a leading IT security and cybersecurity value-added distributor in India for partnerships, product inquiries, and business support.",
      canonical: "https://www.seainfonet.com/contact"
    }
  })
});

app.get('/demo', async (req, res) => {
  res.render('demo', {
    navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
    productCardData: await Product.find().lean(),
    header: {
      title: "Demo | SEA Infonet | Leading IT Security Value Added Distributor in India",
      description: "Request a cybersecurity product demo from SEA Infonet and explore enterprise IT security solutions for businesses, partners, and MSPs.",
      canonical: "https://www.seainfonet.com/demo"
    }
  })
});

app.get('/product', async (req,res,next)=>{
   try {
    const data = await ProductPage.find({ status: "published" }).select('hero productKey -_id').lean();

    res.render('product', {
      data: data, navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
      productCardData: await Product.find().lean(),
      header: {
        title: `Product | SEA Infonet | Leading IT Security Value Added Distributor in India`,
        description: "Explore cybersecurity and IT security products distributed by SEA Infonet including endpoint security, backup, email security, and enterprise protection solutions.",
        canonical: `https://www.seainfonet.com/product`
      }
    });

  } catch (err) {
    
    next(err)
  }
})

app.get('/product/:productKey', async (req, res, next) => {
  try {
    const key = req.params.productKey.toLowerCase();
    const item = await ProductPage.findOne({ productKey: key });
    if (!item) {
      return res.status(404).render('404');
    }
    res.render('productPage', {
      data: item, navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
      productCardData: await Product.find().lean(),
      header: {
        title: `${key} | SEA Infonet | Leading IT Security Value Added Distributor in India`,
        description: "Explore cybersecurity and IT security products distributed by SEA Infonet including endpoint security, backup, email security, and enterprise protection solutions.",
        canonical: `https://www.seainfonet.com/product/${key}`
      }
    })
  } catch (err) {
    next(err);
  }

});

app.get('/msp', async (req, res) => {
  res.render('msp', {
    navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
    productCardData: await Product.find().lean(),
    header: {
      title: "MSP | SEA Infonet | Leading IT Security Value Added Distributor in India",
      description: "Explore cybersecurity and managed security solutions for MSPs with SEA Infonet, a leading IT security value-added distributor in India.",
      canonical: "https://www.seainfonet.com/msp"

    }
  })

});

app.get('/resource', async (req, res) => {
  res.render('resource', {
    navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
    productCardData: await Product.find().lean(),
    header: {
      title: "Resources | SEA Infonet | Leading IT Security Value Added Distributor in India",
      description: "Access cybersecurity resources, product documents, solution guides, datasheets, and industry insights from SEA Infonet.",
      canonical: "https://www.seainfonet.com/resource",

    }
  })
});
app.get('/privacy-policy', async (req, res) => {
  res.render('privacy-policy', {
    navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
    productCardData: await Product.find().lean(),
    header: {
      title: "Privacy Policy | SEA Infonet | Leading IT Security Value Added Distributor in India",
      description: "Read the Privacy Policy of SEA Infonet Pvt. Ltd. to understand how we collect, use, and protect user and business partner information.",
      canonical: "https://www.seainfonet.com/privacy-policy"
    }
  })
})
app.get('/terms-conditions', async (req, res) => {
  res.render('terms-conditions', {
    navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
    productCardData: await Product.find().lean(),
    header: {
      title: "Terms & Conditions | SEA Infonet | Leading IT Security Value Added Distributor in India",
      description: "Read the Terms & Conditions governing the use of the SEA Infonet website, services, and business interactions.",
      canonical: "https://www.seainfonet.com/terms-conditions"
    }
  })
})



app.use('/homeproduct', routeProduct);
app.use('/productpage', routeProductPage);


app.use("/createuser", authRoute);
app.use("/users", userRoutes);
app.use("/leads", leadRoutes);



app.use(notFound);
app.use(errorHandler);



module.exports = app;





