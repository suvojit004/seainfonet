const z = require("zod");

const createPartnerInquirySchema = z.object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full name is required"),

    companyName: z
      .string()
      .trim()
      .min(2, "Company name is required"),

    email: z
      .string()
      .email("Invalid email address"),

    phone: z
      .string()
      .trim()
      .min(6, "Phone number is required"),

    companyType: z
      .enum([
        "reseller",
        "system-integrator",
        "msp",
        "distributor",
        "other",
      ])
      .optional()
      .or(z.literal("").transform(() => undefined)),

    interest: z
      .enum([
        "kaspersky",
        "bytescreen",
        "safetica",
        "acronis",
        "teramind",
        "godmarc",
        "multiple",
      ])
      .optional()
      .or(z.literal("").transform(() => undefined)),

    message: z
      .string()
      .max(2000)
      .optional()
      .or(z.literal("").transform(() => undefined)),
  });



const updateStatusSchema = z.object({
    status: z.enum([
      "new",
      "contacted",
      "qualified",
      "rejected",
    ]),
  });


module.exports = {
  createPartnerInquirySchema,
  updateStatusSchema
};