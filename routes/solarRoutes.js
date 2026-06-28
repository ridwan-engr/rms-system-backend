import { Router } from "express";

import {
  createSolarPlant,
  getSolarPlants,
  getSolarPlant,
  updateSolarPlant,
  deleteSolarPlant,
  getSolarDashboard,
  getLiveSolar,
  getSolarTrend,
  getSolarRanking,
  getSolarSite
} from "../controllers/solarController.js";

import {
  requireAuth
} from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/",
  requireAuth,
  getSolarPlants
);

router.get(
  "/:id",
  requireAuth,
  getSolarPlant
);

router.post(
  "/",
  requireAuth,
  createSolarPlant
);

router.patch(
  "/:id",
  requireAuth,
  updateSolarPlant
);

router.delete(
  "/:id",
  requireAuth,
  deleteSolarPlant
);
router.get("/", getSolarDashboard);

router.get("/live", getLiveSolar);

router.get("/trend", getSolarTrend);

router.get("/ranking", getSolarRanking);

router.get("/site/:siteName", getSolarSite);

export default router;