import { asyncHandler } from "../utils/asyncHandler.js";
import {Forecast} from "../models/Forecast.js";
import {ApiError} from "../utils/ApiError.js";

export const createForecast =
  asyncHandler(async (req, res) => {

    const forecast =
      await Forecast.create(req.body);

    res.status(201).json({
      success: true,
      forecast
    });
  });

export const getForecasts =
  asyncHandler(async (req, res) => {

    const forecasts =
      await Forecast.find()
      .populate("siteId");

    res.json({
      success: true,
      forecasts
    });
  });

  export const getForecast =
  asyncHandler(async (req, res) => {

    const forecast =
      await Forecast.findById(
        req.params.id
      );

    if (!forecast) {
      throw new ApiError(
        404,
        "Forecast not found"
      );
    }

    res.status(200).json({
      success: true,
      forecast
    });

    });

    export const deleteForecast =
  asyncHandler(async (req, res) => {

    const forecast =
      await Forecast.findByIdAndDelete(
        req.params.id
      );

    if (!forecast) {
      throw new ApiError(
        404,
        "Forecast not found"
      );
    }

    res.status(200).json({
      success: true,
      message:
        "Forecast deleted successfully"
    });

    });