import { EnergyRecord }
from "../models/EnergyRecord.js";

import { asyncHandler }
from "../utils/asyncHandler.js";

export const createEnergyRecord =
  asyncHandler(async (req, res) => {

    const record =
      await EnergyRecord.create(req.body);

      req.io.emit("energy-created", record);

    res.status(201).json({
      success: true,
      count: record.length,
      record
    });
  });

export const getEnergyRecords =
  asyncHandler(async (req, res) => {

    const records =
      await EnergyRecord.find()
      .populate("siteId")
      .sort({ recordTime: -1 });

    res.json({
      success: true,
      count: records.length,
      records
    });
  });

  export const getEnergyRecord = asyncHandler(async (req, res) => {
    
      const record = await EnergyRecord.findById(req.params.id);
    
      if (!record) {
        throw new ApiError(404, "Energy record not found");
      }
    
      res.status(200).json({
        success: true,
        record
      });
  
    
    });

  export const updateEnergyRecord = asyncHandler(async (req, res) => {

  const record = await EnergyRecord.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  res.status(200).json({
    success: true,
    message: "Record updated successfully",
    record
  });

});

export const deleteEnergyRecord = asyncHandler(async (req, res) => {

  const record = await EnergyRecord.findByIdAndDelete(req.params.id);

  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  res.status(200).json({
    success: true,
    message: "Record deleted successfully"
  });

});
