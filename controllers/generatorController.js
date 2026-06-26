import { Generator } from "../models/Generator.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createGenerator =
  asyncHandler(async (req, res) => {

    const generator =
      await Generator.create(req.body);

    res.status(201).json({
      success: true,
      count: generator.length,
      generator
    });
  });

export const getGenerators =
  asyncHandler(async (req, res) => {

    const generators =
      await Generator.find()
      .populate("siteId");

    res.json({
      success: true,
      count: generators.length,
      generators
    });
  });