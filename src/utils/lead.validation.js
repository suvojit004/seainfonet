const { z } = require("zod");
const INQUIRY_TYPES = require("../constants/inquiry-types");
const LEAD_STATUS = require("../constants/lead-status");
const PRODUCT = require ("../constants/product");
const mongoose = require("mongoose");

const createLeadSchema =
  z.object({
    firstName:
      z.string().min(2),

    lastName:
      z.string().optional(),

    email:
      z.string().email(),

    phone:
      z.string().optional(),

    company:
      z.string().optional(),

    inquiryType:
      z.enum(Object.values(INQUIRY_TYPES)),
    
    product:
    z.enum(Object.values(PRODUCT)),

    message:
      z.string().min(10),
  });

const updateLeadSchema = z.object({
  status: z.enum(Object.values(LEAD_STATUS)),
});
const addLeadNoteSchema =
  z.object({
    text: z
      .string()
      .min(3)
      .max(1000),
  });

  const assignLeadSchema =
  z.object({
    assignedTo:
      z.string().refine(
    (id) => mongoose.Types.ObjectId.isValid(id),
    {
      message: "Invalid user id",
    }
  ),
  });

module.exports = {
  createLeadSchema,
  updateLeadSchema,
  addLeadNoteSchema,
  assignLeadSchema,
};