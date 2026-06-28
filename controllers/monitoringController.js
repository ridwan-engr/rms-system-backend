/**
 * ============================================================
 * HEMAP
 * Monitoring Controller
 *
 * Central Live Monitoring API
 *
 * Used By
 *
 * Monitoring.jsx
 * Dashboard.jsx
 * Digital Twin
 *
 * ============================================================
 */

import {

    liveSolarStatus

} from "../analytics/services/solarService.js";

import {

    liveBatteryStatus

} from "../analytics/services/batteryService.js";

import {

    liveGeneratorStatus

} from "../analytics/services/generatorService.js";

import {

    liveGridStatus

} from "../analytics/services/gridService.js";

import {

    liveEnergyFlow

} from "../analytics/services/energyService.js";


/**
 * ============================================================
 * GET /api/monitoring
 * ============================================================
 */

export async function getMonitoringOverview(

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

            grid

        ] = await Promise.all([

            liveEnergyFlow(),

            liveSolarStatus(),

            liveBatteryStatus(),

            liveGeneratorStatus(),

            liveGridStatus()

        ]);

        return res.status(200).json({

            success:true,

            data:{

                timestamp:new Date(),

                energy,

                solar,

                battery,

                generator,

                grid

            }

        });

    }

    catch(error){

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/monitoring/solar
 * ============================================================
 */

export async function getLiveSolar(

    req,

    res,

    next

){

    try{

        const data=

            await liveSolarStatus();

        return res.status(200).json({

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
 * GET /api/monitoring/battery
 * ============================================================
 */

export async function getLiveBattery(

    req,

    res,

    next

){

    try{

        const data=

            await liveBatteryStatus();

        return res.status(200).json({

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
 * GET /api/monitoring/generator
 * ============================================================
 */

export async function getLiveGenerator(

    req,

    res,

    next

){

    try{

        const data=

            await liveGeneratorStatus();

        return res.status(200).json({

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
 * GET /api/monitoring/grid
 * ============================================================
 */

export async function getLiveGrid(

    req,

    res,

    next

){

    try{

        const data=

            await liveGridStatus();

        return res.status(200).json({

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
 * GET /api/monitoring/energy
 * ============================================================
 */

export async function getLiveEnergy(

    req,

    res,

    next

){

    try{

        const data=

            await liveEnergyFlow();

        return res.status(200).json({

            success:true,

            data

        });

    }

    catch(error){

        next(error);

    }

}