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
    title: z.string().default("Hero Title"),
    subtitle: z.string().default("Sub title"),
    image: z.string().default("#"),
    highlights: z.array(z.string()).default(["Highlight"]),
    buttons: z.array(buttonSchema).default([{}])
  }).optional(),

  whyThisProduct: z.object({
    title: z.string().default("Why Title"),
    subtitle: z.string().default("Subtitle"),
    image: z.string().default("#"),
    points: z.array(featureItemSchema).default([{}])
  }).optional(),

  products: z
    .array(productCardSchema)
    .default([{}])
});

module.exports = {
  createProductPageSchema
};