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

const router = Router();

router.get("/solar", getSolarAnalytics);

router.get("/battery", getBatteryAnalytics);

router.get("/generator", getGeneratorAnalytics);

router.get("/grid", getGridAnalytics);

router.get("/energy", getEnergyAnalytics);

router.get("/reliability", getReliabilityAnalytics);

router.get("/live", getLiveTelemetry);

export default router;