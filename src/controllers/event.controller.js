const eventService = require("../services/event.service");
const asyncHandler = require("../utils/asyncHandler")

const create = asyncHandler(async (req, res) => {
  const event = await eventService.create(req.body);

  res.status(201).json({
    success: true,
    message: "Event created successfully",
    data: event,
  });
});

const getAll = asyncHandler(async (req, res) => {
  const result = await eventService.getAll(req.query);

  res.status(200).json({
    success: true,
    ...result,
  });
});

const getUpcoming = asyncHandler(async (req, res) => {
  const result = await eventService.getUpcoming(req.query);

  res.status(200).json({
    success: true,
    ...result,
  });
});

const getBySlug = asyncHandler(async (req, res) => {
  const event = await eventService.getBySlug(
    req.params.slug
  );

  res.status(200).json({
    success: true,
    data: event,
  });
});

const update = asyncHandler(async (req, res) => {
  const event = await eventService.update(
    req.params.slug,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Event updated successfully",
    data: event,
  });
});

const remove = asyncHandler(async (req, res) => {
  await eventService.remove(
    req.params.slug
  );

  res.status(200).json({
    success: true,
    message: "Event deleted successfully",
  });
});

module.exports = {
  create,
  getAll,
  getUpcoming,
  getBySlug,
  update,
  remove,
};