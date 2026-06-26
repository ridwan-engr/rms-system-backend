import { SolarPlant } from "../models/SolarPlant.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createSolarPlant =
  asyncHandler(async (req, res) => {

    const solar =
      await SolarPlant.create(req.body);

    res.status(201).json({
      success: true,
      count: solar.length,
      solar
    });
  });

export const getSolarPlants =
  asyncHandler(async (req, res) => {

    const solar =
      await SolarPlant.find()
      .populate("siteId");

    res.json({
      success: true,
      count: solar.length,
      solar
    });
  });