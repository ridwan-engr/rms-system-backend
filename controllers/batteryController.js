/**
 * ============================================================
 * HEMAP
 * Battery Controller
 *
 * Used By
 *
 * Battery.jsx
 * Dashboard.jsx
 * Monitoring.jsx
 * Reports.jsx
 *
 * ============================================================
 */

import { Battery } from "../models/Battery.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {

    batteryDashboard,
    liveBatteryStatus,
    batteryTrend,
    batteryHealth,
    batteryRuntime,
    batteryEfficiency

}

from "../analytics/services/batteryService.js";


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

  export const getBattery = asyncHandler(async (req, res) => {
      
        const battery = await Battery.findById(req.params.id);
      
        if (!battery) {
          throw new ApiError(404, "Battery not found");
        }
      
        res.status(200).json({
          success: true,
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

  export const updateBattery = asyncHandler(async (req, res) => {
  const battery = await Battery.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!battery) {
    throw new ApiError(404, "Battery not found");
  }

  res.status(200).json({
    success: true,
    message: "Battery updated successfully",
    battery
  });

});

export const deleteBattery = asyncHandler(async (req, res) => {

  const battery = await Battery.findByIdAndDelete(req.params.id);

  if (!battery) {
    throw new ApiError(404, "Battery not found");
  }

  res.status(200).json({
    success: true,
    message: "Battery deleted successfully"
  });

});



/**
 * ============================================================
 * GET /api/battery
 * ============================================================
 */

export async function getBatteryDashboard(

    req,

    res,

    next

){

    try{

        const dashboard =

            await batteryDashboard();

        return res.status(200).json({

            success:true,

            data:dashboard

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/battery/live
 * ============================================================
 */

export async function getLiveBattery(

    req,

    res,

    next

){

    try{

        const telemetry =

            await liveBatteryStatus();

        return res.status(200).json({

            success:true,

            data:telemetry

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/battery/trend
 * ============================================================
 */

export async function getBatteryTrend(

    req,

    res,

    next

){

    try{

        const trend =

            await batteryTrend();

        return res.status(200).json({

            success:true,

            data:trend

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/battery/health
 * ============================================================
 */

export async function getBatteryHealth(

    req,

    res,

    next

){

    try{

        const health =

            await batteryHealth();

        return res.status(200).json({

            success:true,

            data:health

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/battery/runtime
 * ============================================================
 */

export async function getBatteryRuntime(

    req,

    res,

    next

){

    try{

        const runtime =

            await batteryRuntime();

        return res.status(200).json({

            success:true,

            data:runtime

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/battery/efficiency
 * ============================================================
 */

export async function getBatteryEfficiency(

    req,

    res,

    next

){

    try{

        const efficiency =

            await batteryEfficiency();

        return res.status(200).json({

            success:true,

            data:efficiency

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/battery/site/:siteName
 * ============================================================
 */

export async function getBatterySite(

    req,

    res,

    next

){

    try{

        const telemetry =

            await liveBatteryStatus();

        const site = telemetry.find(

            item =>

                item.site === req.params.siteName

        );

        if(!site){

            return res.status(404).json({

                success:false,

                message:"Battery site not found."

            });

        }

        return res.status(200).json({

            success:true,

            data:site

        });

    }

    catch(error){

        next(error);

    }

}