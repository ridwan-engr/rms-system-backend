import { Router } from "express";

import {

    getDashboard,
    getEnergyDashboard,
    getDashboardKPI,
    getFleetSummary,
    getAlarmSummary,
    getDigitalTwin

} from "../controllers/dashboardController.js";

const router = Router();

router.get("/", getDashboard);

router.get("/energy", getEnergyDashboard);

router.get("/kpi", getDashboardKPI);

router.get("/fleet", getFleetSummary);

router.get("/alarms", getAlarmSummary);

router.get("/digital-twin", getDigitalTwin);

export default router;