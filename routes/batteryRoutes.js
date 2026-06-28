import { Router } from "express";

import {
  createBattery,
  getBatteries,
  getBattery,
  deleteBattery,
  getBatteryDashboard,
  getLiveBattery,
  getBatteryTrend,
  getBatteryHealth,
  getBatteryRuntime,
  getBatteryEfficiency,
  getBatterySite
} from "../controllers/batteryController.js";

import {
  requireAuth
} from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/",
  requireAuth,
  getBatteries
);

router.post(
  "/",
  requireAuth,
  createBattery
);

router.get("/", getBatteryDashboard);

router.get("/live", getLiveBattery);

router.get("/trend", getBatteryTrend);

router.get("/health", getBatteryHealth);

router.get("/runtime", getBatteryRuntime);

router.get("/efficiency", getBatteryEfficiency);

router.get("/site/:siteName", getBatterySite);

export default router;