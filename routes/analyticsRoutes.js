import { Router } from "express";

import {

    getSolarAnalytics,
    getBatteryAnalytics,
    getGeneratorAnalytics,
    getGridAnalytics,
    getEnergyAnalytics,
    getReliabilityAnalytics,
    getLiveTelemetry

} from "../controllers/analyticsController.js";

export const analytics = {
    getSolarAnalytics,
    getBatteryAnalytics,
    getGeneratorAnalytics,
    getGridAnalytics,
    getEnergyAnalytics,
    getReliabilityAnalytics,
    getLiveTelemetry
};

const router = Router();

router.get("/analytics", getSolarAnalytics);

router.get("/battery", getBatteryAnalytics);

router.get("/generator", getGeneratorAnalytics);

router.get("/grid", getGridAnalytics);

router.get("/energy", getEnergyAnalytics);

router.get("/reliability", getReliabilityAnalytics);

router.get("/live", getLiveTelemetry);

export default router;