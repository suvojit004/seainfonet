const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      trim: true,
    },

    company: {
      type: String,
      trim: true,
    },

    profileImage: String,

    linkedinUrl: String,

    bio: String,

    role: {
      type: String,
      enum: ["speaker", "moderator", "host", "panelist"],
      default: "speaker",
    },
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    shortDescription: String,

    description: String,

    speakers: {
      type: [speakerSchema],
      default: [],
    },

    eventType: {
      type: String,
      enum: ["webinar", "workshop", "training", "conference"],
      default: "webinar",
    },

    eventDate: {
      type: Date,
      required: true,
    },

    eventEndDate: Date,

    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },

    registrationLink: String,

    meetingLink: String,

    bannerImage: String,

    galleryImages: {
      type: [String],
      default: [],
    },

    maxParticipants: Number,

    registrationDeadline: Date,

    recordingUrl: String,

    certificateAvailable: {
      type: Boolean,
      default: false,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["draft", "upcoming", "completed", "cancelled"],
      default: "draft",
    },

    seoTitle: String,

    seoDescription: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);