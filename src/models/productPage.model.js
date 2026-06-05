const mongoose = require("mongoose");

const buttonSchema = new mongoose.Schema({
    text: {
        type: String,
        default: "Btn",
        trim: true
    },

    link: {
        type: String,
        default: "#",
        trim: true
    }

}, { _id: false });

const productCardSchema = new mongoose.Schema({
    title: { type: String, default: "Product Title", trim: true },
    description: { type: String, default: "Description", trim: true }
}, { _id: false });

const featureItemSchema = new mongoose.Schema({
    title: { type: String, default: "Feature Title", trim: true },
    description: { type: String, default: "Description", trim: true }
}, { _id: false });

const planSchema = new mongoose.Schema({
    plan: { type: String, default: "Plan Title", trim: true },
    bestFor: { type: String, default: "Best For", trim: true },
    keyFeatures: { type: String, default: "Feature", trim: true }
}, { _id: false });

const faqSchema = new mongoose.Schema({
    question: { type: String, default: "FaQ Question", trim: true },
    answer: { type: String, default: "Answer", trim: true }
}, { _id: false });

const resourceSchema = new mongoose.Schema({
    title: { type: String, default: "Resource Title", trim: true },
    buttonText: { type: String, default: "Btn Text", trim: true },
    link: { type: String, default: "#", trim: true }
}, { _id: false });

const productPageSchema = new mongoose.Schema({
    productKey: { type: String, required: true, unique: true, trim: true, lowercase: true }, // kaspersky-endpoint-security
     
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    },

    hero: {
        title: { type: String, default: "Hero Title", trim: true },
        subtitle: { type: String, default: "Sub title", trim: true },
        image: { type: String, default: "#", trim: true },
        highlights: {
            type: [{ type: String, trim: true }],
            default: ["Highlight"]
        },
        buttons: {
            type: [buttonSchema],
            default: () => ([{}])
        }
    },

    whyThisProduct: {
        title: { type: String, default: "Why Title", trim: true },
        subtitle: { type: String, default: "Subtitle", trim: true },
        image: { type: String, default: "Title", trim: true },
        points: {
            type: [featureItemSchema],
            default: () => ([{}])
        }
    },

    products: {
        type: [productCardSchema],
        default: () => ([{}])
    },

    keyFeatures: {
        title: { type: String, default: "Key Title", trim: true },
        subtitle: { type: String, default: "Key sub-Title", trim: true },
        image: { type: String, default: "#", trim: true },
        features: {
            type: [featureItemSchema],
            default: () => ([{}])
        }
    },

    useCases: {
        type: [productCardSchema],
        default: () => ([{}])
    },

    plans: {
        type: [planSchema],
        default: () => ([{}])
    },

    resellerBenefits: {
    left: {
        type: [{ type: String, trim: true }],
        default: ["Benefit left"]
    },

    right: {
        type: [{ type: String, trim: true }],
        default: ["Benefit right"]
    }
},

    whySeaInfonet: {
        title: { type: String, default: "Why SEA Infonet", trim: true },
        description: { type: String, default: "Authorized distributor with PAN India support, strong vendor relationships, and fast turnaround", trim: true }
    },

    resources: {
        type: [resourceSchema],
        default: () => ([{}])
    },

    faqs: {
        type: [faqSchema],
        default: () => ([{}])
    },

    finalCTA: {
        title: { type: String, default: "Grow Your Business with SEA Infonet", trim: true },
        buttons: {
            type: [buttonSchema],
           default: () => ([{}])
        }
    }

}, { timestamps: true,  minimize: false});

module.exports = mongoose.model("ProductPage", productPageSchema);