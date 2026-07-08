const Event = require("../models/event.model");
const AppError = require("../utils/AppError");

const create = async (data) => {
  const exists = await Event.findOne({
    slug: data.slug.toLowerCase(),
  });

  if (exists) {
    throw new AppError("Event already exists", 400);
  }

  return Event.create({
    ...data,
    slug: data.slug.toLowerCase(),
  });
};

const getAll = async ({
  page = 1,
  limit = 10,
  status,
  eventType,
  featured,
}) => {
  const query = {};

  if (status) {
    query.status = status;
  }

  if (eventType) {
    query.eventType = eventType;
  }

  if (featured !== undefined) {
    query.isFeatured = featured;
  }

  const skip = (page - 1) * limit;

  const [events, total] = await Promise.all([
    Event.find(query)
      .sort({ 
        isFeatured: -1,
        eventDate: -1 
    })
      .skip(skip)
      .limit(limit).lean(),
    Event.countDocuments(query),
  ]);

  return {
    events,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const getBySlug = async (slug) => {
  const event = await Event.findOne({
    slug: slug.toLowerCase(),
  }).lean();

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  return event;
};

const getUpcoming = async ({
  page = 1,
  limit = 10,
}) => {
  const query = {
    status: "upcoming",
    eventDate: {
      $gte: new Date(),
    },
  };

  const skip = (page - 1) * limit;

  const [events, total] = await Promise.all([
    Event.find(query)
      .sort({ eventDate: 1 })
      .skip(skip)
      .limit(limit),
    Event.countDocuments(query),
  ]);

  return {
    events,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};


const update = async (slug, data) => {

  const currentEvent = await Event.findOne({
    slug: slug.toLowerCase(),
  });

  if (!currentEvent) {
    throw new AppError("Event not found", 404);
  }

  if (
    data.slug &&
    data.slug.toLowerCase() !== currentEvent.slug
  ) {
    const exists = await Event.findOne({
      slug: data.slug.toLowerCase(),
    });

    if (exists) {
      throw new AppError(
        "Event with this slug already exists",
        400
      );
    }

    data.slug = data.slug.toLowerCase();
  }

  return Event.findByIdAndUpdate(
    currentEvent._id,
    {
      $set: data,
    },
    {
      new: true,
      runValidators: true,
    }
  );
};


const getFeatured = async (limit = 3) => {
  return Event.find({
    isFeatured: true,
    status: "upcoming",
  })
    .sort({ eventDate: 1 })
    .limit(limit)
    .lean();
};

const remove = async (slug) => {
  const event = await Event.findOneAndDelete({
    slug: slug.toLowerCase(),
  });

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  return event;
};

module.exports = {
  create,
  getAll,
  getBySlug,
  getUpcoming,
  update,
  remove,
  getFeatured,
};