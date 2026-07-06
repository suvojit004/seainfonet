const eventService = require("../../services/event.service");
const asyncHandler = require("../../utils/asyncHandler")
const ProductPage = require("../../models/productPage.model");
const Product = require("../../models/product.model");
const AppError = require("../../utils/AppError");




const getAll = asyncHandler(async (req, res) => {
    const events = await eventService.getAll(req.query);

    res.render('events', {
        navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
        productCardData: await Product.find().lean(),
        header: {
            title: "Cybersecurity Events & Partner Trainings | SEA Infonet | Leading IT Security Value Added Distributor in India",
            description: "Join cybersecurity webinars, partner trainings, workshops, and industry events hosted by SEA Infonet. Learn from security experts and stay updated on the latest IT security solutions and technologies.",
            canonical: "https://www.seainfonet.com/events"

        },
        events: events.events
    });

});

const getBySlug = asyncHandler(
    async (req, res, next) => {
        try {
            const event = await eventService.getBySlug(req.params.slug);
            if (!event) throw new AppError("Product page not found", 404);
            const relatedEvents = await eventService.getAll({
                eventType: event.eventType
            })
            res.render('event-detail', {
                navData: await ProductPage.find({ status: "published" }).select("productKey -_id").lean(),
                productCardData: await Product.find().lean(),
                header: {
                    title: `${event.seoTitle} | SEA Infonet | Leading IT Security Value Added Distributor in India`,
                    description: `Join ${event.seoTitle}, a cybersecurity ${event.eventType} hosted by SEA Infonet. Learn from industry experts, explore the latest security technologies, and gain practical insights into cybersecurity solutions and best practices.`,
                    canonical: `https://www.seainfonet.com/events/${event.slug}`

                },
                event,
                relatedEvents: relatedEvents.events.slice(0, 3),
                currentUrl: `${req.protocol}://${req.get('host')}${req.originalUrl}`
            });
        } catch (error) {
            next(error)
        }

    });


module.exports = {
    getAll,
    getBySlug
};

