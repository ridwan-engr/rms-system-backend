import { asyncHandler } from "../utils/asyncHandler.js";
import {Forecast} from "../models/Forecast.js";
import {ApiError} from "../utils/ApiError.js";
import {
    solarForecast,
    loadForecast,
    batteryForecast,
    generatorForecast,
    forecastSummary
}

from "../analytics/services/forecastService.js";

export const createForecast =
  asyncHandler(async (req, res) => {

    const forecast =
      await Forecast.create(req.body);

    res.status(201).json({
      success: true,
      count: forecast.length,
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
      count: forecasts.length,
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
      count: forecast.length,
      forecast
    });

    });

    export const updateForecast = asyncHandler(async (req, res) => {
    
      const forecast = await Forecast.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );
    
      if (!forecast) {
        throw new ApiError(404, "Forecast not found");
      }
    
      res.status(200).json({
        success: true,
        message: "Forecast updated successfully",
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
      count: forecast.length,
      message:
        "Forecast deleted successfully"
    });

    });

/**
 * ============================================================
 * GET /api/forecast
 * ============================================================
 */

export async function getForecastSummary(

    req,

    res,

    next

){

    try{

        const summary =

            await forecastSummary();

        return res.status(200).json({

            success:true,

            data:summary

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/forecast/solar
 * ============================================================
 */

export async function getSolarForecast(

    req,

    res,

    next

){

    try{

        const forecast =

            await solarForecast();

        return res.status(200).json({

            success:true,

            data:forecast

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/forecast/load
 * ============================================================
 */

export async function getLoadForecast(

    req,

    res,

    next

){

    try{

        const forecast =

            await loadForecast();

        return res.status(200).json({

            success:true,

            data:forecast

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/forecast/battery
 * ============================================================
 */

export async function getBatteryForecast(

    req,

    res,

    next

){

    try{

        const forecast =

            await batteryForecast();

        return res.status(200).json({

            success:true,

            data:forecast

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/forecast/generator
 * ============================================================
 */

export async function getGeneratorForecast(

    req,

    res,

    next

){

    try{

        const forecast =

            await generatorForecast();

        return res.status(200).json({

            success:true,

            data:forecast

        });

    }

    catch(error){

        next(error);

    }

}