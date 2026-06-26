import { Battery } from "../models/Battery.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createBattery =
  asyncHandler(async (req, res) => {

    const battery =
      await Battery.create(req.body);

    res.status(201).json({
      success: true,
      count: battery.length,
      battery
    });
  });

export const getBatteries =
  asyncHandler(async (req, res) => {

    const batteries =
      await Battery.find()
      .populate("siteId");

    res.json({
      success: true,
      count: batteries.length,
      batteries
    });
  });