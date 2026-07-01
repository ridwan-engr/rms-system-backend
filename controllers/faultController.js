import { FaultLog }
  from "../models/FaultLog.js";
import { ApiError }
  from "../utils/ApiError.js";

import { asyncHandler }
  from "../utils/asyncHandler.js";

export const createFault =
  asyncHandler(async (req, res) => {

    const fault =
      await FaultLog.create(req.body);

      //req.io.emit("fault-created", fault);

    res.status(201).json({
      success: true,
      count: fault.length,
      fault
    });
  });

export const getFaults =
  asyncHandler(async (req, res) => {

    const faults =
      await FaultLog.find()
        .populate("siteId")
        .sort({
          occurrenceTime: -1
        });

    res.json({
      success: true,
      count: faults.length,
      faults
    });
  });

export const getFault =
  asyncHandler(async (req, res) => {

    const fault =
      await FaultLog.findById(
        req.params.id
      );

    if (!fault) {
      throw new ApiError(
        404,
        "Fault not found"
      );
    }

    fault.status =
      "resolved";

    fault.resolvedTime =
      new Date();

    await fault.save();

    res.json({
      success: true,
      count: fault.length,
      fault
    });
  });

export const updateFault = asyncHandler(async (req, res) => {

  const fault = await FaultLog.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!fault) {
    throw new ApiError(404, "Fault not found");
  }

  res.status(200).json({
    success: true,
    message: "Fault updated successfully",
    fault
  });

});

export const deleteFault =
  asyncHandler(async (req, res) => {

    const fault =
      await FaultLog.findByIdAndDelete(
        req.params.id
      );

    if (!fault) {
      throw new ApiError(
        404,
        "Fault not found"
      );
    }

    res.status(200).json({
      success: true,
      count: fault.length,
      message:
        "Fault deleted successfully"
    });

  });

