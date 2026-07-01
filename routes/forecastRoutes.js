import { Router } from "express";

import {
  createForecast,
  getForecasts,
  getForecast,
  updateForecast,
  deleteForecast,
  getForecastSummary,
  getSolarForecast,
  getLoadForecast,
  getBatteryForecast,
  getGeneratorForecast
} from "../controllers/forecastController.js";

import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

/* ============================================================
 * Forecast Analytics
 * ============================================================
 */

router.get("/summary", requireAuth, getForecastSummary);

router.get("/solar", requireAuth, getSolarForecast);

router.get("/load", requireAuth, getLoadForecast);

router.get("/battery", requireAuth, getBatteryForecast);

router.get("/generator", requireAuth, getGeneratorForecast);

/* ============================================================
 * CRUD
 * ============================================================
 */

router.get("/", requireAuth, getForecasts);

router.get("/:id", requireAuth, getForecast);

router.post("/", requireAuth, createForecast);

router.patch("/:id", requireAuth, updateForecast);

router.delete("/:id", requireAuth, deleteForecast);

export default router;