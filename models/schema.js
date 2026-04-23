const mongoose = require("mongoose");


const commonFields = {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    btntxt: { type: String, required: true, trim: true }
};
const baseFormFields = {
    name: { type: String, required: true, trim: true },
    number: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email']
    },
    subject: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
};

const homeCarouselSchema = new mongoose.Schema({
    url: { type: String, required: true, trim: true }
}, { timestamps: true });
const homeProductSchema = new mongoose.Schema(commonFields, { timestamps: true });

const homeProductScenarioSchema = new mongoose.Schema(commonFields, { timestamps: true })

const socialMediaSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true }
})

const contactFormSchema = new mongoose.Schema(baseFormFields, { timestamps: true })

const demoFormSchema = new mongoose.Schema({
    ...baseFormFields,
    product: { type: String, required: true, trim: true }
}, { timestamps: true })


const HomeCarousel = mongoose.model('HomeCarousel', homeCarouselSchema);
const HomeProduct = mongoose.model('HomeProduct', homeProductSchema);
const HomeProductScenario = mongoose.model('HomeProductScenario', homeProductScenarioSchema);
const SocialMedia = mongoose.model('SocialMedia', socialMediaSchema);
const ContactForm = mongoose.model('ContactForm', contactFormSchema);
const DemoForm = mongoose.model('DemoForm', demoFormSchema);

module.exports = {HomeCarousel, HomeProduct, HomeProductScenario, SocialMedia, ContactForm, DemoForm};


