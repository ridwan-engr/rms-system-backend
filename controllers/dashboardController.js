/**
 * ============================================================
 * HEMAP
 * Dashboard Controller
 *
 * Central Dashboard API
 *
 * Used By
 *
 * React Dashboard
 * Mobile Dashboard
 * Socket.IO
 *
 * ============================================================
 */

import {

    dashboardAnalytics,

    fleetSummary,

    alarmSummary

}

from "../analytics/services/analyticsService.js";

import {

    energyDashboard,

    energyKPI,

    digitalTwinSnapshot

}

from "../analytics/services/energyService.js";



/**
 * ============================================================
 * GET /api/dashboard
 * ============================================================
 */

export async function getDashboard(

    req,

    res,

    next

){

    try{

        const dashboard=

            await dashboardAnalytics();

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
 * GET /api/dashboard/energy
 * ============================================================
 */

export async function getEnergyDashboard(

    req,

    res,

    next

){

    try{

        const energy=

            await energyDashboard();

        return res.status(200).json({

            success:true,

            energy

        });

    }

    catch(error){

        next(error);

    }

}



/**
 * ============================================================
 * GET /api/dashboard/kpi
 * ============================================================
 */

export async function getDashboardKPI(

    req,

    res,

    next

){

    try{

        const kpi=

            await energyKPI();

        return res.status(200).json({

            success:true,

            kpi

        });

    }

    catch(error){

        next(error);

    }

}



/**
 * ============================================================
 * GET /api/dashboard/fleet
 * ============================================================
 */

export async function getFleetSummary(

    req,

    res,

    next

){

    try{

        const summary=

            await fleetSummary();

        return res.status(200).json({

            success:true,

            summary

        });

    }

    catch(error){

        next(error);

    }

}



/**
 * ============================================================
 * GET /api/dashboard/alarms
 * ============================================================
 */

export async function getAlarmSummary(

    req,

    res,

    next

){

    try{

        const alarms=

            await alarmSummary();

        return res.status(200).json({

            success:true,

            alarms

        });

    }

    catch(error){

        next(error);

    }

}



/**
 * ============================================================
 * GET /api/dashboard/digital-twin
 * ============================================================
 */

export async function getDigitalTwin(

    req,

    res,

    next

){

    try{

        const twin=

            await digitalTwinSnapshot();

        return res.status(200).json({

            success:true,

            twin

        });

    }

    catch(error){

        next(error);

    }

}