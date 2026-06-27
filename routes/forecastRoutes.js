import { Router } from "express";

import {
  createForecast,
  getForecasts,
  getForecast,
    deleteForecast,
  updateForecast
} from "../controllers/forecastController.js";

import {
  requireAuth
} from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", requireAuth, createForecast);

router.get("/:id", requireAuth, getForecast);

router.get("/", requireAuth, getForecasts);

router.patch( "/:id", requireAuth, updateForecast);

router.delete("/:id", requireAuth, deleteForecast);

export default router;