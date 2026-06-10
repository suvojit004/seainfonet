const { z } = require("zod");

const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6),
});

const setupAdminSchema = z.object({
  firstName: z
    .string()
    .min(2),

  email: z.email(),

  password: z
    .string()
    .min(8),
});

module.exports = {loginSchema, setupAdminSchema}