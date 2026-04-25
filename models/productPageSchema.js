const mongoose = require("mongoose");

const buttonSchema = new mongoose.Schema({
    text: { type: String, required: true, trim: true },
    link: { type: String, default: "#", trim: true },
}, { _id: false });

const productCardSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
}, { _id: false });

const featureItemSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
}, { _id: false });

const planSchema = new mongoose.Schema({
    plan: { type: String, required: true, trim: true },
    bestFor: { type: String, required: true, trim: true },
    keyFeatures: { type: String, required: true, trim: true }
}, { _id: false });

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true }
}, { _id: false });

const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    buttonText: { type: String, required: true, trim: true },
    link: { type: String, default: "#", trim: true }
}, { _id: false });

const productPageSchema = new mongoose.Schema({
    productKey: { type: String, required: true, unique: true, trim: true, lowercase: true }, // kaspersky-endpoint-security

    hero: {
        title: { type: String, required: true, trim: true },
        subtitle: { type: String, required: true, trim: true },
        image: { type: String, required: true, trim: true },
        highlights: [{ type: String, trim: true }],
        buttons: [buttonSchema]
    },

    whyThisProduct: {
        title: { type: String, required: true, trim: true },
        subtitle: { type: String, required: true, trim: true },
        image: { type: String, required: true, trim: true },
        points: [featureItemSchema]
    },

    products: [productCardSchema],

    keyFeatures: {
        title: { type: String, required: true, trim: true },
        subtitle: { type: String, required: true, trim: true },
        image: { type: String, required: true, trim: true },
        features: [featureItemSchema]
    },

    useCases: [productCardSchema],

    plans: [planSchema],

    resellerBenefits: {
        left: [{ type: String, trim: true }],
        right: [{ type: String, trim: true }]
    },

    whySeaInfonet: {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true }
    },

    resources: [resourceSchema],

    faqs: [faqSchema],

    finalCTA: {
        title: { type: String, required: true, trim: true },
        buttons: [buttonSchema]
    }

}, { timestamps: true });

module.exports = mongoose.model("ProductPage", productPageSchema);