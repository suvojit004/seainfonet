const mongoose = require("mongoose");
const { z } = require("zod");
const ROLES = require("../constants/roles")

const createUserSchema = z.object({
    firstName: z.string().min(2),

    email: z
        .string()
        .email(),

    password: z
        .string()
        .min(8),

    role: z.enum([
        "super_admin",
        "admin",
        "editor",
    ]),
});
const userIdSchema = z.object({
    id: z.string().refine(
        (id) =>
            mongoose.Types.ObjectId.isValid(
                id
            ),
        {
            message:
                "Invalid user id",
        }
    ),
});

const updateUserSchema =
    z.object({
        firstName:
            z.string().min(2)
                .optional(),

        lastName:
            z.string()
                .optional(),

        role: z.enum([
            ROLES.SUPER_ADMIN,
            ROLES.ADMIN,
            ROLES.EDITOR,
        ]).optional(),

        isActive:
            z.boolean()
                .optional(),
    })
        .refine(
            (data) =>
                Object.keys(data)
                    .length > 0,
            {
                message:
                    "At least one field is required",
            }
        );



module.exports = {
    createUserSchema, userIdSchema, updateUserSchema
};