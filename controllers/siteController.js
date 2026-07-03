import { Site } from "../models/Site.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
//import { Socket } from "socket.io";
// Create Site
export const createSite = asyncHandler(async (req, res) => {

  const site = await Site.create(req.body);

  //req.io.emit("site-created", site);

  res.status(201).json({
    success: true,
    message: "Site created successfully",
    site
  });

});


// Get All Sites
export const getSites = asyncHandler(async (req, res) => {

  const sites = await Site.find()
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: sites.length,
    sites
  });

});

// Get Single Site
export const getSite = asyncHandler(async (req, res) => {

  const site = await Site.findById(req.params.id);

  if (!site) {
    throw new ApiError(404, "Site not found");
  }

  res.status(200).json({
    success: true,
    site
  });

});

// Update Site
export const updateSite = asyncHandler(async (req, res) => {

  const site = await Site.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!site) {
    throw new ApiError(404, "Site not found");
  }

  res.status(200).json({
    success: true,
    message: "Site updated successfully",
    site
  });

});

// Delete Site
export const deleteSite = asyncHandler(async (req, res) => {

  const site = await Site.findByIdAndDelete(req.params.id);

  if (!site) {
    throw new ApiError(404, "Site not found");
  }

  res.status(200).json({
    success: true,
    message: "Site deleted successfully"
  });

});