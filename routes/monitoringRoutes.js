import { Router } from "express";

import {

    getMonitoringOverview,
    getLiveSolar,
    getLiveBattery,
    getLiveGenerator,
    getLiveGrid,
    getLiveEnergy

} from "../controllers/monitoringController.js";

const router = Router();

router.get("/", getMonitoringOverview);

router.get("/solar", getLiveSolar);

router.get("/battery", getLiveBattery);

router.get("/generator", getLiveGenerator);

router.get("/grid", getLiveGrid);

router.get("/energy", getLiveEnergy);

export default router;