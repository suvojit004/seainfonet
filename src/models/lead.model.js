const mongoose = require("mongoose");

const LEAD_STATUS = require("../constants/lead-status");

const INQUIRY_TYPES = require("../constants/inquiry-types");

const leadSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
        },

        company: {
            type: String,
        },

        inquiryType: {
            type: String,
            enum: Object.values(
                INQUIRY_TYPES
            ),
            required: true,
        },

        message: {
            type: String,
            required: true,
        },
        product: { type: String, required: true, trim: true },
        notes: [
            {
                text: {
                    type: String,
                    required: true,
                    trim: true,
                },

                createdBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },

                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],

        status: {
            type: String,
            enum: Object.values(
                LEAD_STATUS
            ),
            default:
                LEAD_STATUS.NEW,
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Lead", leadSchema);