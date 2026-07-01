/**
 * ============================================================
 * HEMAP
 * Solar Controller
 *
 * Used By
 *
 * Solar.jsx
 * Dashboard.jsx
 * Monitoring.jsx
 * Reports.jsx
 *
 * ============================================================
 */

import {

    solarDashboard,
    liveSolarStatus,
    solarEnergyTrend,
    solarRanking

}

from "../analytics/services/solarService.js";

import { SolarPlant } from "../models/SolarPlant.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createSolarPlant =
  asyncHandler(async (req, res) => {

    const solar =
      await SolarPlant.create(req.body);

     // req.io.emit("solarplant-created", solar);

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

  export const getSolarPlant = asyncHandler(async (req, res) => {

  const solar = await SolarPlant.findById(req.params.id);

  if (!solar) {
    throw new ApiError(404, "solarplant not found");
  }

  res.status(200).json({
    success: true,
    solar
  });

});

export const updateSolarPlant = asyncHandler(async (req, res) => {

  const solar = await SolarPlant.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!solar) {
    throw new ApiError(404, "Solar plant not found");
  }

  res.status(200).json({
    success: true,
    message: "Solar plant updated successfully",
    solar
  });

});

export const deleteSolarPlant = asyncHandler(async (req, res) => {

  const solar = await SolarPlant.findByIdAndDelete(req.params.id);

  if (!solar) {
    throw new ApiError(404, "Solar plant not found");
  }

  res.status(200).json({
    success: true,
    message: "Solarplant deleted successfully"
  });

});



/**
 * ============================================================
 * GET /api/solar
 * ============================================================
 */

export async function getSolarDashboard(

    req,

    res,

    next

){

    try{

        const dashboard =

            await solarDashboard();

        return res.status(200).json({

            success:true,

            dashboard

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/solar/live
 * ============================================================
 */

export async function getLiveSolar(

    req,

    res,

    next

){

    try{

        const telemetry =

            await liveSolarStatus();

        return res.status(200).json({

            success:true,

            telemetry

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/solar/trend
 * ============================================================
 */

export async function getSolarTrend(

    req,

    res,

    next

){

    try{

        const trend =

            await solarEnergyTrend();

        return res.status(200).json({

            success:true,

            trend

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/solar/ranking
 * ============================================================
 */

export async function getSolarRanking(

    req,

    res,

    next

){

    try{

        const ranking =

            await solarRanking();

        return res.status(200).json({

            success:true,

            ranking

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/solar/site/:siteName
 * ============================================================
 */

export async function getSolarSite(

    req,

    res,

    next

){

    try{

        const telemetry =

            await liveSolarStatus();

        const site = telemetry.find(

            item =>

                item.site === req.params.siteName

        );

        if(!site){

            return res.status(404).json({

                success:false,

                message:"Solar site not found."

            });

        }

        return res.status(200).json({

            success:true,

            site

        });

    }

    catch(error){

        next(error);

    }

}