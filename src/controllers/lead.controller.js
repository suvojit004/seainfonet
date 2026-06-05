const asyncHandler = require("../utils/asyncHandler");

const leadService = require("../services/lead.service");

const createLead =
  asyncHandler(
    async (req, res) => {
      console.log(req.body)
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
      const lead =
        await leadService.createLead(
          req.body
        );

      res.status(201).json({
        success: true,
        data: lead,
      });
    }
  );

const getLeads =
  asyncHandler(
    async (req, res) => {
      const result = await leadService.getLeads(req.query);


      res.status(200).json({
        success: true,
        data: result.leads,
        pagination: result.pagination,
      });
    }
  );

const getLeadById = asyncHandler(
  async (req, res) => {
    const lead =
      await leadService.getLeadById(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: lead,
    });
  }
);

const updateLead = asyncHandler(
  async (req, res) => {
    const lead =
      await leadService.updateLead(
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      data: lead,
    });
  }
);

const addNoteToLead =
  asyncHandler(
    async (req, res) => {
      const lead =
        await leadService.addNoteToLead(
          req.params.id,
          req.user._id,
          req.body
        );

      res.status(200).json({
        success: true,
        data: lead,
      });
    }
  );

const assignLead =
  asyncHandler(
    async (req, res) => {
      const lead =
        await leadService.assignLead(
          req.params.id,
          req.body.assignedTo,
          req.user._id
        );

      res.status(200).json({
        success: true,
        data: lead,
      });
    }
  );

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  addNoteToLead,
  assignLead,
};