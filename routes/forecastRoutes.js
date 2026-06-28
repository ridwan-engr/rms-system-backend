import { Router } from "express";

import {
  createForecast,
  getForecasts,
  getForecast,
  deleteForecast,
  updateForecast,
  getForecastSummary,
  getSolarForecast,
  getLoadForecast,
  getBatteryForecast,
  getGeneratorForecast

} from "../controllers/forecastController.js";

import {
  requireAuth
} from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", requireAuth, createForecast);

router.get("/:id", requireAuth, getForecast);

router.get("/", requireAuth, getForecasts);

router.patch("/:id", requireAuth, updateForecast);

router.delete("/:id", requireAuth, deleteForecast);

router.get("/", getForecastSummary);

router.get("/solar", getSolarForecast);

router.get("/load", getLoadForecast);

router.get("/battery", getBatteryForecast);

router.get("/generator", getGeneratorForecast);


export default router;