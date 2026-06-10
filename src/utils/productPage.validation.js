const { z } = require("zod");

const buttonSchema = z.object({
  text: z.string().trim().default("Btn"),
  link: z.string().trim().default("#")
});

const featureItemSchema = z.object({
  title: z.string().trim().default("Feature Title"),
  description: z.string().trim().default("Description")
});

const productCardSchema = z.object({
  title: z.string().trim().default("Product Title"),
  description: z.string().trim().default("Description")
});

const planSchema = z.object({
  plan: z.string().trim().default("Plan Title"),
  bestFor: z.string().trim().default("Best For"),
  keyFeatures: z.string().trim().default("Feature")
});

const faqSchema = z.object({
  question: z.string().trim().default("FAQ Question"),
  answer: z.string().trim().default("Answer")
});

const resourceSchema = z.object({
  title: z.string().trim().default("Resource Title"),
  buttonText: z.string().trim().default("Btn Text"),
  link: z.string().trim().default("#")
});

const createProductPageSchema = z.object({
  productKey: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Product key is required"),

  status: z
    .enum(["draft", "published"])
    .default("draft"),

  hero: z.object({
    title: z.string().trim().default("Hero Title"),
    subtitle: z.string().trim().default("Sub title"),
    image: z.string().trim().default("#"),
    highlights: z
      .array(z.string().trim())
      .default(["Highlight"]),
    buttons: z
      .array(buttonSchema)
      .default([{}])
  }).optional(),

  whyThisProduct: z.object({
    title: z.string().trim().default("Why Title"),
    subtitle: z.string().trim().default("Subtitle"),
    image: z.string().trim().default("#"),
    points: z
      .array(featureItemSchema)
      .default([{}])
  }).optional(),

  products: z
    .array(productCardSchema)
    .default([{}]),

  keyFeatures: z.object({
    title: z.string().trim().default("Key Title"),
    subtitle: z.string().trim().default("Key sub-Title"),
    image: z.string().trim().default("#"),
    features: z
      .array(featureItemSchema)
      .default([{}])
  }).optional(),

  useCases: z
    .array(productCardSchema)
    .default([{}]),

  plans: z
    .array(planSchema)
    .default([{}]),

  resellerBenefits: z.object({
    left: z
      .array(z.string().trim())
      .default(["Benefit left"]),

    right: z
      .array(z.string().trim())
      .default(["Benefit right"])
  }).optional(),

  whySeaInfonet: z.object({
    title: z
      .string()
      .trim()
      .default("Why SEA Infonet"),

    description: z
      .string()
      .trim()
      .default(
        "Authorized distributor with PAN India support, strong vendor relationships, and fast turnaround"
      )
  }).optional(),

  resources: z
    .array(resourceSchema)
    .default([{}]),

  faqs: z
    .array(faqSchema)
    .default([{}]),

  finalCTA: z.object({
    title: z
      .string()
      .trim()
      .default(
        "Grow Your Business with SEA Infonet"
      ),

    buttons: z
      .array(buttonSchema)
      .default([{}])
  }).optional()
});

const updateProductPageSchema =
  createProductPageSchema
    .omit({ productKey: true })
    .partial()
    .refine(
      (data) =>
        Object.keys(data).length > 0,
      {
        message:
          "At least one field must be provided"
      }
    );

module.exports = {
  createProductPageSchema,
  updateProductPageSchema
};