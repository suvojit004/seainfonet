const { z } = require("zod");

const speakerSchema = z.object({
  name: z.string().trim().min(1, "Speaker name is required"),

  designation: z.string().trim().optional(),

  company: z.string().trim().optional(),

  profileImage: z.string().optional(),

  linkedinUrl: z.string().url().optional(),

  bio: z.string().optional(),

  role: z
    .enum([
      "speaker",
      "moderator",
      "host",
      "panelist",
    ])
    .default("speaker"),
});


const createEventSchema = z.object({
  title: z.string().trim().min(1),

  slug: z.string().trim().min(1),

  shortDescription: z.string().optional(),

  description: z.string().optional(),

  speakers: z.array(speakerSchema).default([]),

  eventType: z
    .enum([
      "webinar",
      "workshop",
      "training",
      "conference",
    ])
    .default("webinar"),

  eventDate: z.coerce.date(),

  eventEndDate: z.coerce.date().optional(),

  timezone: z.string().default("Asia/Kolkata"),

  registrationLink: z.string().url().optional(),

  meetingLink: z.string().url().optional(),

  bannerImage: z.string().optional(),

  galleryImages: z.array(z.string()).default([]),

  maxParticipants: z.number().int().positive().optional(),

  registrationDeadline: z.coerce.date().optional(),

  recordingUrl: z.string().url().optional(),

  certificateAvailable: z.boolean().default(false),

  isFeatured: z.boolean().default(false),

  status: z
    .enum([
      "draft",
      "upcoming",
      "completed",
      "cancelled",
    ])
    .default("draft"),

  seoTitle: z.string().optional(),

  seoDescription: z.string().optional(),
}).superRefine((data, ctx) => {

    if (
      data.status !== "draft" &&
      data.speakers.length === 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["speakers"],
        message: "At least one speaker is required",
      });
    }

    if (
      data.eventEndDate &&
      data.eventEndDate <= data.eventDate
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["eventEndDate"],
        message:
          "Event end date must be after event date",
      });
    }

  });

const updateEventSchema =  z.object(createEventSchema.shape).partial();

const eventQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),

  limit: z.coerce.number().int().positive().max(100).default(10),

  status: z
    .enum([
      "draft",
      "upcoming",
      "completed",
      "cancelled",
    ])
    .optional(),

  eventType: z
    .enum([
      "webinar",
      "workshop",
      "training",
      "conference",
    ])
    .optional(),

  featured: z.coerce.boolean().optional(),
});


module.exports = {
  createEventSchema,
  updateEventSchema,
  eventQuerySchema,
};


