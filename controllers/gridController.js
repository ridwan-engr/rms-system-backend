import { Grid } from "../models/Grid.js";

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {

    gridDashboard,
    liveGridStatus,
    voltageTrend,
    frequencyTrend,
    importExportSummary,
    gridAvailability,
    outageSummary
}

from "../analytics/services/gridService.js";

// Create Grid Record

export const createGridRecord =
  asyncHandler(async (req, res) => {

    const grid =
      await Grid.create(req.body);

    res.status(201).json({
      success: true,
      count: grid.length,
      message:
        "Grid record created successfully",
      grid
    });

  });


//Get All Grid Records

export const getGridRecords =
  asyncHandler(async (req, res) => {

    const grids =
      await Grid.find()
        .populate("siteId")
        .sort({
          createdAt: -1
        });

    res.status(200).json({
      success: true,
      count: grids.length,
      grids
    });

  });

//Get Single Grid Record


export const getGridRecord =
  asyncHandler(async (req, res) => {

    const grid =
      await Grid.findById(
        req.params.id
      ).populate("siteId");

    if (!grid) {
      throw new ApiError(
        404,
        "Grid record not found"
      );
    }

    res.status(200).json({
      success: true,
      count: grid.length,
      grid
    });

  });

//  Update Grid Record

export const updateGridRecord =
  asyncHandler(async (req, res) => {

    const grid =
      await Grid.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!grid) {
      throw new ApiError(
        404,
        "Grid record not found"
      );
    }

    res.status(200).json({
      success: true,
      count: grid.length,
      message:
        "Grid record updated successfully",
      grid
    });

  });

//Delete Grid Record

export const deleteGridRecord =
  asyncHandler(async (req, res) => {

    const grid =
      await Grid.findByIdAndDelete(
        req.params.id
      );

    if (!grid) {
      throw new ApiError(
        404,
        "Grid record not found"
      );
    }

    res.status(200).json({
      success: true,
      count: grid.length,
      message:
        "Grid record deleted successfully"
    });

  });

// Grid Availability Summary

export const getGridStatus =
  asyncHandler(async (req, res) => {

    const totalRecords =
      await Grid.countDocuments();

    const outages =
      await Grid.countDocuments({
        outageStatus: true
      });

    res.status(200).json({
      success: true,
      count: totalRecords,
      totalRecords,
      outages,
      availability:
        totalRecords > 0
          ? (
              ((totalRecords - outages) /
                totalRecords) *
              100
            ).toFixed(2)
          : 0
    });

  });

  /**
 * ============================================================
 * HEMAP
 * Grid Controller
 *
 * Used By
 *
 * Grid.jsx
 * Dashboard.jsx
 * Monitoring.jsx
 * Reports.jsx
 *
 * ============================================================
 */



/**
 * ============================================================
 * GET /api/grid
 * ============================================================
 */

export async function getGridDashboard(

    req,

    res,

    next

){

    try{

        const dashboard =

            await gridDashboard();

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
 * GET /api/grid/live
 * ============================================================
 */

export async function getLiveGrid(

    req,

    res,

    next

){

    try{

        const telemetry =

            await liveGridStatus();

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
 * GET /api/grid/voltage
 * ============================================================
 */

export async function getVoltageTrend(

    req,

    res,

    next

){

    try{

        const trend =

            await voltageTrend();

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
 * GET /api/grid/frequency
 * ============================================================
 */

export async function getFrequencyTrend(

    req,

    res,

    next

){

    try{

        const trend =

            await frequencyTrend();

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
 * GET /api/grid/import-export
 * ============================================================
 */

export async function getImportExport(

    req,

    res,

    next

){

    try{

        const report =

            await importExportSummary();

        return res.status(200).json({

            success:true,

            data:report

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/grid/availability
 * ============================================================
 */

export async function getGridAvailability(

    req,

    res,

    next

){

    try{

        const availability =

            await gridAvailability();

        return res.status(200).json({

            success:true,

            data:availability

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/grid/outages
 * ============================================================
 */

export async function getGridOutages(

    req,

    res,

    next

){

    try{

        const outages =

            await outageSummary();

        return res.status(200).json({

            success:true,

            data:outages

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/grid/site/:siteName
 * ============================================================
 */

export async function getGridSite(

    req,

    res,

    next

){

    try{

        const telemetry =

            await liveGridStatus();

        const site = telemetry.find(

            item =>

                item.site === req.params.siteName

        );

        if(!site){

            return res.status(404).json({

                success:false,

                message:"Grid site not found."

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