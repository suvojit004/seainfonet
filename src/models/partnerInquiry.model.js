const mongoose = require("mongoose");

const partnerInquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    companyType: {
      type: String,
      enum: [
        "reseller",
        "system-integrator",
        "msp",
        "distributor",
        "other",
      ],
      default: null,
    },

    interest: {
      type: String,
      enum: [
        "kaspersky",
        "bytescreen",
        "safetica",
        "acronis",
        "teramind",
        "godmarc",
        "multiple",
      ],
      default: null,
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "rejected"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PartnerInquiry",
  partnerInquirySchema
);