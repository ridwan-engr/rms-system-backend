import { asyncHandler }
from "../utils/asyncHandler.js";
import { Analytics } from "../models/Analytics.js";

export const createAnalytics =
  asyncHandler(async (req, res) => {

    const analytics =
      await Analytics.create(req.body);

    res.status(201).json({
      success: true,
      count: analytics.length,
      analytics
    });
  });

export const getAnalytics =
  asyncHandler(async (req, res) => {

    const analytics =
      await Analytics.find()
      .populate("siteId");

    res.json({
      success: true,
        count: analytics.length,
      analytics
    });
  });

export const updateAnalytics = asyncHandler(async (req, res) => {
  const analytics =
    await Analytics.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json({
    success: true,
    count: analytics.length,
    analytics
  });
});
