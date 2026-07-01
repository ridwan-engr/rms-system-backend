import { FaultLog }
from "../models/FaultLog.js";

import { Report }
from "../models/Report.js";

import { asyncHandler }
from "../utils/asyncHandler.js";

import {

    dailyEnergyReport
}

from "../analytics/services/energyService.js";

import {

    solarDashboard
}

from "../analytics/services/solarService.js";

import {

    batteryDashboard

}

from "../analytics/services/batteryService.js";

import {

    generatorDashboard,
    generatorFuelReport,
    generatorEmissionReport

}

from "../analytics/services/generatorService.js";

import {

    gridDashboard

}

from "../analytics/services/gridService.js";

import {

    annualReliability

}

from "../analytics/services/reliabilityService.js";


export const createReport =
  asyncHandler(async (req, res) => {

    const report =
      await Report.create(req.body);

      req.io.emit("report-created", report);

    res.status(201).json({
      success: true,
      count: reports.length,
      report
    });
  });

export const getReports =
  asyncHandler(async (req, res) => {

    const reports =
      await Report.find()
      .populate("siteId")
      .sort({
        occurrenceTime: -1
      });

    res.json({
      success: true,
      count: reports.length,
      reports
    });
  });

export const getReport =
  asyncHandler(async (req, res) => {

    const report =
      await Report.findById(
        req.params.id
      );

      if (!report) {
  throw new ApiError(
    404,
    "Report not found"
  );
}

    report.status =
      "resolved";

    report.resolvedTime =
      new Date();

    await report.save();

    res.json({
      success: true,
      count: reports.length,
      report
    });
  });

export const updateReport = asyncHandler(async (req, res) => {

  const report = await Report.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!report) {
    throw new ApiError(404, "Report not found");
  }

  res.status(200).json({
    success: true,
    message: "Report updated successfully",
    report
  });

});

// Delete Site
export const deleteReport = asyncHandler(async (req, res) => {

  const report = await Report.findByIdAndDelete(req.params.id);

  if (!report) {
    throw new ApiError(404, "Report not found");
  }

  res.status(200).json({
    success: true,
    message: "Report deleted successfully"
  });

});


/**
 * ============================================================
 * Overall Report
 * ============================================================
 */

export async function getOverallReport(

    req,

    res,

    next

){

    try{

        const [

            energy,

            solar,

            battery,

            generator,

            grid,

            reliability

        ] = await Promise.all([

            dailyEnergyReport(),

            solarDashboard(),

            batteryDashboard(),

            generatorDashboard(),

            gridDashboard(),

            annualReliability()

        ]);

        return res.status(200).json({

            success:true,

            generatedAt:new Date(),

            data:{

                energy,

                solar,

                battery,

                generator,

                grid,

                reliability

            }

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * Energy Report
 * ============================================================
 */

export async function getEnergyReport(

    req,

    res,

    next

){

    try{

        const report =

            await dailyEnergyReport();

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
 * Fuel Report
 * ============================================================
 */

export async function getFuelReport(

    req,

    res,

    next

){

    try{

        const dieselPrice =

            Number(req.query.price || 1200);

        const report =

            await generatorFuelReport(

                dieselPrice

            );

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
 * Emission Report
 * ============================================================
 */

export async function getEmissionReport(

    req,

    res,

    next

){

    try{

        const report =

            await generatorEmissionReport();

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
 * Reliability Report
 * ============================================================
 */

export async function getReliabilityReport(

    req,

    res,

    next

){

    try{

        const report =

            await annualReliability();

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
 * Executive Summary
 * ============================================================
 */

export async function getExecutiveSummary(

    req,

    res,

    next

){

    try{

        const [

            solar,

            battery,

            generator,

            grid,

            reliability

        ] = await Promise.all([

            solarDashboard(),

            batteryDashboard(),

            generatorDashboard(),

            gridDashboard(),

            annualReliability()

        ]);

        return res.status(200).json({

            success:true,

            data:{

                renewableContribution:

                    solar.performanceRatio,

                batterySOC:

                    battery.averageSOC,

                generatorEfficiency:

                    generator.averageEfficiency,

                gridAvailability:

                    grid.availability,

                reliabilityIndex:

                    reliability.saifi,

                generatedAt:

                    new Date()

            }

        });

    }

    catch(error){

        next(error);

    }

}
  