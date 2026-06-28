import { Router } from "express";

import {

    getReliabilityDashboard,
    getAnnualReliability,
    getMonthlyReliability,
    getReliabilityTrend,
    getReliabilityAlarm,
    getReliabilityKPI

} from "../controllers/reliabilityController.js";

const router = Router();

router.get("/", getReliabilityDashboard);

router.get("/annual", getAnnualReliability);

router.get("/monthly", getMonthlyReliability);

router.get("/trend", getReliabilityTrend);

router.get("/alarm", getReliabilityAlarm);

router.post("/kpi", getReliabilityKPI);

export default router;