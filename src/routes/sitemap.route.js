const router = require("express").Router();
const { SitemapStream, streamToPromise } = require("sitemap");

const ProductPage = require("../models/productPage.model");
const Event = require("../models/event.model");

const staticPages = [
  {
    url: "/",
    changefreq: "weekly",
    priority: 1.0,
  },
  {
    url: "/about",
    changefreq: "monthly",
    priority: 0.9,
  },
  {
    url: "/product",
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    url: "/events",
    changefreq: "weekly",
    priority: 0.8,
  },
  {
    url: "/partner-with-us",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    url: "/partner-education",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    url: "/demo",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    url: "/contact",
    changefreq: "yearly",
    priority: 0.7,
  },
  {
    url: "/privacy-policy",
    changefreq: "yearly",
    priority: 0.3,
  },
  {
    url: "/terms-conditions",
    changefreq: "yearly",
    priority: 0.3,
  },
];


router.get("/", async (req, res) => {
  try {

    const smStream = new SitemapStream({
      hostname: "https://www.seainfonet.com",
    });

    // Static URLs
    staticPages.forEach(page => smStream.write(page));

    // Products
    const products = await ProductPage.find({
      status: "published"
    }).select("productKey updatedAt");

    products.forEach(product => {
      smStream.write({
        url: `/product/${product.productKey}`,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: product.updatedAt,
      });
    });

    // Events
    const events = await Event.find({
      status: { $ne: "draft" }
    }).select("slug updatedAt");

    events.forEach(event => {
      smStream.write({
        url: `/events/${event.slug}`,
        changefreq: "monthly",
        priority: 0.7,
        lastmod: event.updatedAt,
      });
    });

    smStream.end();

    const sitemap = await streamToPromise(smStream);

    res.header("Content-Type", "application/xml");
    res.send(sitemap.toString());

  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

module.exports = router;