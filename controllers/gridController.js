import { Grid } from "../models/Grid.js";

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create Grid Record

export const createGridRecord =
  asyncHandler(async (req, res) => {

    const grid =
      await Grid.create(req.body);

    res.status(201).json({
      success: true,
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