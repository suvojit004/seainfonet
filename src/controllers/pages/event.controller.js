const eventService = require("../../services/event.service");
const asyncHandler = require("../../utils/asyncHandler")
const ProductPage = require("../../models/productPage.model");
const Product = require("../../models/product.model");




const getAll = asyncHandler(async (req, res) => {
    const events = await eventService.getAll(req.query);

    res.render('events', {
        navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
        productCardData: await Product.find().lean(),
        header: {
            title: "MSP | SEA Infonet | Leading IT Security Value Added Distributor in India",
            description: "Explore cybersecurity and managed security solutions for MSPs with SEA Infonet, a leading IT security value-added distributor in India.",
            canonical: "https://www.seainfonet.com/msp"

        },
        events: events.events
    });

});

const getBySlug = asyncHandler(
    async (req, res) => {
        const event = await eventService.getBySlug(req.params.slug);
        if (!event) return res.status(404).send('Event not found');
        const relatedEvents = await eventService.getAll({
            eventType: event.eventType
        })
        res.render('event-detail', {
            navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
            productCardData: await Product.find().lean(),
            header: {
                title: "MSP | SEA Infonet | Leading IT Security Value Added Distributor in India",
                description: "Explore cybersecurity and managed security solutions for MSPs with SEA Infonet, a leading IT security value-added distributor in India.",
                canonical: "https://www.seainfonet.com/msp"

            },
            event,
            relatedEvents: relatedEvents.events,
            currentUrl: `${req.protocol}://${req.get('host')}${req.originalUrl}`
        });
});


module.exports = {
    getAll,
    getBySlug
};

