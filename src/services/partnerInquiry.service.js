const PartnerInquiry = require("../models/partnerInquiry.model");
const AppError = require("../utils/AppError");

const createInquiry = async (payload) => {

    try{
         const inquiry = await PartnerInquiry.create(payload);
         return inquiry;
    }
    catch (e){
         throw new AppError("Database: Bad Request", 422);
    }
 
  
  
};

const getAllInquiries = async () => {
  return PartnerInquiry.find()
    .sort({ createdAt: -1 });
};

const getInquiryById = async (id) => {
  return PartnerInquiry.findById(id);
};

const updateInquiryStatus = async (
  id,
  status
) => {
  return PartnerInquiry.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
      runValidators: true,
    }
  );
};
const removeEnquiry = async (id) => {
  const inquiry = await PartnerInquiry.findOneAndDelete({_id: id});

  if (!inquiry) {
    throw new AppError("PartnerInquiry not found", 404);
  }

  return inquiry;
};

module.exports = {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  removeEnquiry
};