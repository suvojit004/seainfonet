const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        tags: {
            type: [String],
            default: [],
        },

        imageLink: {
            type: String,
            trim: true,
            default: "#",
        },
        displayOrder: {
            type: Number,
            default: 0
        },

        button: {
            text: {
                type: String,
                default: "Learn More",
                trim: true,
            },

            link: {
                type: String,
                default: "#",
                trim: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);