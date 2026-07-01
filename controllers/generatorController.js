import { Generator } from "../models/Generator.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {

    generatorDashboard,
    liveGeneratorStatus,
    generatorFuelReport,
    generatorHealth,
    generatorRuntime,
    maintenanceReport,
    generatorEmissionReport

}

from "../analytics/services/generatorService.js";

export const createGenerator =
  asyncHandler(async (req, res) => {

    const generator =
      await Generator.create(req.body);

      req.io.emit("generator-created", generator);

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

  export const getGenerator = asyncHandler(async (req, res) => {
  
    const generator = await Generator.findById(req.params.id);
  
    if (!generator) {
      throw new ApiError(404, "Generator not found");
    }
  
    res.status(200).json({
      success: true,
      generator
    });

  
  });

  export const updateGenerator = asyncHandler(async (req, res) => {

  const generator = await Generator.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!generator) {
    throw new ApiError(404, "Generator not found");
  }

  res.status(200).json({
    success: true,
    message: "Generator updated successfully",
    generator
  });

});

// Delete Site
export const deleteGenerator = asyncHandler(async (req, res) => {

  const generator = await Generator.findByIdAndDelete(req.params.id);

  if (!generator) {
    throw new ApiError(404, "Generator not found");
  }

  res.status(200).json({
    success: true,
    message: "Generator deleted successfully"
  });

});

export async function getGeneratorDashboard(

    req,

    res,

    next

){

    try{

        const dashboard =

            await generatorDashboard();

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
 * GET /api/generator/live
 * ============================================================
 */

export async function getLiveGenerator(

    req,

    res,

    next

){

    try{

        const telemetry =

            await liveGeneratorStatus();

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
 * GET /api/generator/fuel
 * ============================================================
 */

export async function getGeneratorFuel(

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

            report

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/generator/health
 * ============================================================
 */

export async function getGeneratorHealth(

    req,

    res,

    next

){

    try{

        const health =

            await generatorHealth();

        return res.status(200).json({

            success:true,

            health

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/generator/runtime
 * ============================================================
 */

export async function getGeneratorRuntime(

    req,

    res,

    next

){

    try{

        const runtime =

            await generatorRuntime();

        return res.status(200).json({

            success:true,

            runtime

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/generator/maintenance
 * ============================================================
 */

export async function getMaintenanceReport(

    req,

    res,

    next

){

    try{

        const report =

            await maintenanceReport();

        return res.status(200).json({

            success:true,

            report

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/generator/emissions
 * ============================================================
 */

export async function getGeneratorEmissions(

    req,

    res,

    next

){

    try{

        const emissions =

            await generatorEmissionReport();

        return res.status(200).json({

            success:true,

            emissions

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/generator/site/:siteName
 * ============================================================
 */

export async function getGeneratorSite(

    req,

    res,

    next

){

    try{

        const telemetry =

            await liveGeneratorStatus();

        const site = telemetry.find(

            item =>

                item.site === req.params.siteName

        );

        if(!site){

            return res.status(404).json({

                success:false,

                message:"Generator site not found."

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

};
