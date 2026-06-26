import { Site } from "../models/Site.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createSite = asyncHandler(async (req, res) => {
  const site = await Site.create(req.body);

  res.status(201).json({
    success: true,
    count: sites.length,
    site
  });
});

export const getSites = asyncHandler(async (req, res) => {
  const sites = await Site.find();

  res.json({
    success: true,
    count: sites.length,
    sites
  });
});

export const getSite = asyncHandler(async (req, res) => {
  const site =
    await Site.findById(req.params.id);

  if (!site) {
    throw new ApiError(404, "Site not found");
  }

  res.json({
    success: true,
    count: sites.length,
    site
  });
});

export const updateSite = asyncHandler(async (req, res) => {
  const site =
    await Site.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json({
    success: true,
    count: sites.length,
    site
  });
});

export const deleteSite = asyncHandler(async (req, res) => {
  await Site.findByIdAndDelete(
    req.params.id
  );

  res.json({
    success: true,
    count: sites.length,
    message: "Site deleted"
  });
});