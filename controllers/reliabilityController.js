/**
 * ============================================================
 * HEMAP
 * Reliability Controller
 *
 * Used By
 *
 * Reports.jsx
 * Analytics.jsx
 * Dashboard.jsx
 *
 * ============================================================
 */

import {

    reliabilityDashboard,
    annualReliability,
    monthlyReliability,
    reliabilityTrend,
    reliabilityAlarm,
    reliabilityKPI

}

    from "../analytics/services/reliabilityService.js";


/**
 * ============================================================
 * GET /api/reliability
 * ============================================================
 */

export async function getReliabilityDashboard(

    req,

    res,

    next

) {

    try {

        const dashboard =

            await reliabilityDashboard();

        return res.status(200).json({

            success: true,

            dashboard

        });

    }

    catch (error) {

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/reliability/annual
 * ============================================================
 */

export async function getAnnualReliability(

    req,

    res,

    next

) {

    try {

        const report =

            await annualReliability();

        return res.status(200).json({

            success: true,

            report

        });

    }

    catch (error) {

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/reliability/monthly
 * ============================================================
 */

export async function getMonthlyReliability(

    req,

    res,

    next

) {

    try {

        const report =

            await monthlyReliability();

        return res.status(200).json({

            success: true,

            report

        });

    }

    catch (error) {

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/reliability/trend
 * ============================================================
 */

export async function getReliabilityTrend(

    req,

    res,

    next

) {

    try {

        const trend =

            await reliabilityTrend();

        return res.status(200).json({

            success: true,

            trend

        });

    }

    catch (error) {

        next(error);

    }

}


/**
 * ============================================================
 * GET /api/reliability/alarm
 * ============================================================
 */

export async function getReliabilityAlarm(

    req,

    res,

    next

) {

    try {

        const alarm =

            await reliabilityAlarm();

        return res.status(200).json({

            success: true,

            alarm

        });

    }

    catch (error) {

        next(error);

    }

}


    /**
     * ============================================================
     * GET /api/reliability/kpi
     * ============================================================
     */

    export async function getReliabilityKPI(

        req,

        res,

        next

    ) 
    
    {

        try {

            const {

                monthlySAIFI = [],

                monthlySAIDI = []

            } = req.body;

            const kpi =

                reliabilityKPI({

                    monthlySAIFI,

                    monthlySAIDI

                });

            return res.status(200).json({

                success: true,

                kpi

            });

        }

        catch (error) {

            next(error);

        }

    }