import { Router } from "express";

import {
  createBattery,
  getBatteries,
  getBattery,
  updateBattery,
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
} from "../middlewares/authMiddleware.js";

const router = Router();

/* ============================================================
 * Analytics
 * ============================================================
 */

router.get("/dashboard", requireAuth, getBatteryDashboard);

router.get("/live", requireAuth, getLiveBattery);

router.get("/trend", requireAuth, getBatteryTrend);

router.get("/health", requireAuth, getBatteryHealth);

router.get("/runtime", requireAuth, getBatteryRuntime);

router.get("/efficiency", requireAuth, getBatteryEfficiency);

router.get("/site/:siteName", requireAuth, getBatterySite);

/* ============================================================
 * CRUD
 * ============================================================
 */

router.get("/", requireAuth, getBatteries);

router.get("/:id", requireAuth, getBattery);

router.post("/", requireAuth, createBattery);

router.patch("/:id", requireAuth, updateBattery);

router.delete("/:id", requireAuth, deleteBattery);

export default router;