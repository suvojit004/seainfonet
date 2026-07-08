

const asyncHandler = require(
  "../utils/asyncHandler"
);

const {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  removeEnquiry
} = require("../services/partnerInquiry.service");

const createPartnerInquiry =
  asyncHandler(async (req, res) => {
    if (req.body.website) {
        return res.status(400).json({
          success: false,
          message: "Spam detected"
        });
      }
     if ((Date.now() - Number(req.body.formLoadedAt))<3000){
      return res.status(400).json({
        success: false,
        message: "Form submitted too quickly",
      })
     }
   
    const result = await createInquiry(req.body);

    res.status(201).json({
      success: true,
      message:
        "Partnership inquiry submitted successfully",
      data: result,
    });
  });

const getPartnerInquiries =
  asyncHandler(async (req, res) => {
    const result =
      await getAllInquiries();

    res.status(200).json({
      success: true,
      data: result,
    });
  });

const getPartnerInquiry =
  asyncHandler(async (req, res) => {
    const result =
      await getInquiryById(req.params.id);

    res.status(200).json({
      success: true,
      data: result,
    });
  });

const updateStatus =
  asyncHandler(async (req, res) => {
    const result =
      await updateInquiryStatus(
        req.params.id,
        req.body.status
      );

    res.status(200).json({
      success: true,
      message: "Status updated",
      data: result,
    });
  });

const removePartnerInquiry = asyncHandler(async (req,res) =>{
  const result = await removeEnquiry(req.params.id);
  res.status(200).json({
    success: true,
    message: "Enquiry Deleted",
    data: result,
  })
} )

module.exports = {
  createPartnerInquiry,
  getPartnerInquiries,
  getPartnerInquiry,
  updateStatus,
  removePartnerInquiry
};