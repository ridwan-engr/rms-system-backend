import { FaultLog }
from "../models/FaultLog.js";

import { Report }
from "../models/Report.js";

import { asyncHandler }
from "../utils/asyncHandler.js";

export const createReport =
  asyncHandler(async (req, res) => {

    const report =
      await Report.create(req.body);

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

export const resolveReport =
  asyncHandler(async (req, res) => {
      report
    });
  