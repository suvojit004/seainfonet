const { z } = require("zod");

const createProductSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required"),

    description: z
        .string()
        .trim()
        .min(1, "Description is required"),

    tags: z
        .array(
            z.string().trim().min(1)
        )
        .default([]),

    imageLink: z
        .string()
        .trim()
        .default("#"),

    displayOrder: z
        .coerce
        .number()
        .int()
        .min(0)
        .default(0),

    button: z.object({
        text: z
            .string()
            .trim()
            .default("Learn More"),

        link: z
            .string()
            .trim()
            .default("#"),
    }),
});

const updateProductSchema =
    createProductSchema
        .partial()
        .refine(
            data => Object.keys(data).length > 0,
            {
                message:
                    "At least one field must be provided"
            }
        );

module.exports = { createProductSchema, updateProductSchema }