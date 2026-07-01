/**
 * ============================================================
 * HEMAP
 * Analytics Controller
 *
 * Engineering Analytics API
 *
 * Used By
 *
 * Analytics.jsx
 * Dashboard
 * Reports
 * Charts
 * Digital Twin
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

import {

    batteryDashboard,
    liveBatteryStatus,
    batteryTrend,
    batteryHealth,
    batteryRuntime,
    batteryEfficiency

}

from "../analytics/services/batteryService.js";

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

import {

    energyDashboard,
    energyKPI,
    dailyEnergyReport

}

from "../analytics/services/energyService.js";

import {

    reliabilityDashboard,
    annualReliability,
    monthlyReliability,
    reliabilityTrend,
    reliabilityAlarm

}

from "../analytics/services/reliabilityService.js";


/**
 * ============================================================
 * SOLAR
 * ============================================================
 */

export async function getSolarAnalytics(req,res,next){

    try{

        const data = await solarDashboard();

        res.status(200).json({

            success:true,

            data

        });

    }

    catch(error){

        next(error);

    }

}


export async function getSolarTrend(req,res,next){

    try{

        const data = await solarEnergyTrend();

        res.status(200).json({

            success:true,

            data

        });

    }

    catch(error){

        next(error);

    }

}


export async function getSolarRanking(req,res,next){

    try{

        const data = await solarRanking();

        res.status(200).json({

            success:true,

            data

        });

    }

    catch(error){

        next(error);

    }

}



/**
 * ============================================================
 * BATTERY
 * ============================================================
 */

export async function getBatteryAnalytics(req,res,next){

    try{

        const data = await batteryDashboard();

        res.status(200).json({

            success:true,

            data

        });

    }

    catch(error){

        next(error);

    }

}


export async function getBatteryTrend(req,res,next){

    try{

        const data = await batteryTrend();

        res.status(200).json({

            success:true,

            data

        });

    }

    catch(error){

        next(error);

    }

}


export async function getBatteryHealth(req,res,next){

    try{

        const data = await batteryHealth();

        res.status(200).json({

            success:true,

            data

        });

    }

    catch(error){

        next(error);

    }

}



/**
 * ============================================================
 * GENERATOR
 * ============================================================
 */

export async function getGeneratorAnalytics(req,res,next){

    try{

        const data = await generatorDashboard();

        res.status(200).json({

            success:true,

            data

        });

    }

    catch(error){

        next(error);

    }

}


export async function getGeneratorHealth(req,res,next){

    try{

        const data = await generatorHealth();

        res.status(200).json({

            success:true,

            data

        });

    }

    catch(error){

        next(error);

    }

}


export async function getGeneratorFuel(req,res,next){

    try{

        const dieselPrice =

            Number(req.query.price || 1200);

        const data =

            await generatorFuelReport(dieselPrice);

        res.status(200).json({

            success:true,

            data

        });

    }

    catch(error){

        next(error);

    }

}



/**
 * ============================================================
 * GRID
 * ============================================================
 */

export async function getGridAnalytics(req,res,next){

    try{

        const data = await gridDashboard();

        res.status(200).json({

            success:true,

            data

        });

    }

    catch(error){

        next(error);

    }

}


export async function getVoltageTrend(req,res,next){

    try{

        const data = await voltageTrend();

        res.status(200).json({

            success:true,

            data

        });

    }

    catch(error){

        next(error);

    }

}


export async function getFrequencyTrend(req,res,next){

    try{

        const data = await frequencyTrend();

        res.status(200).json({

            success:true,

            data

        });

    }

    catch(error){

        next(error);

    }

}



/**
 * ============================================================
 * ENERGY
 * ============================================================
 */

export async function getEnergyAnalytics(req,res,next){

    try{

        const data = await energyDashboard();

        res.status(200).json({

            success:true,

            data

        });

    }

    catch(error){

        next(error);

    }

}


export async function getEnergyReport(req,res,next){

    try{

        const data = await dailyEnergyReport();

        res.status(200).json({

            success:true,

            data

        });

    }

    catch(error){

        next(error);

    }

}



/**
 * ============================================================
 * RELIABILITY
 * ============================================================
 */

export async function getReliabilityAnalytics(req,res,next){

    try{

        const data = await reliabilityDashboard();

        res.status(200).json({

            success:true,

            data

        });

    }

    catch(error){

        next(error);

    }

}


export async function getReliabilityTrend(req,res,next){

    try{

        const data = await reliabilityTrend();

        res.status(200).json({

            success:true,

            data

        });

    }

    catch(error){

        next(error);

    }

}


export async function getReliabilityAlarm(req,res,next){

    try{

        const data = await reliabilityAlarm();

        res.status(200).json({

            success:true,

            data

        });

    }

    catch(error){

        next(error);

    }

}



/**
 * ============================================================
 * LIVE TELEMETRY
 * ============================================================
 */

export async function getLiveTelemetry(req,res,next){

    try{

        const [

            solar,

            battery,

            generator,

            grid

        ] = await Promise.all([

            liveSolarStatus(),

            liveBatteryStatus(),

            liveGeneratorStatus(),

            liveGridStatus()

        ]);

        res.status(200).json({

            success:true,

            solar,

            battery,

            generator,

            grid

            }

        );

    }

    catch(error){

        next(error);

    }

}