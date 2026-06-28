import { Router } from "express";

import {
  createGenerator,
  getGenerators,
  getGenerator,
  updateGenerator,
  deleteGenerator,
  getGeneratorDashboard,
  getLiveGenerator,
  getGeneratorFuel,
  getGeneratorHealth,
  getGeneratorRuntime,
  getMaintenanceReport,
  getGeneratorEmissions,
  getGeneratorSite
} from "../controllers/generatorController.js";

import {
  requireAuth
} from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/",
  requireAuth,
  getGenerators
);

router.post(
  "/",
  requireAuth,
  createGenerator
);

router.get(
  "/:id",
  requireAuth,
  getGenerator
);

router.patch(
  "/:id",
  requireAuth,
  updateGenerator
);

router.delete(
  "/:id",
  requireAuth,
  deleteGenerator
);

const router = Router();

router.get("/", getGeneratorDashboard);

router.get("/live", getLiveGenerator);

router.get("/fuel", getGeneratorFuel);

router.get("/health", getGeneratorHealth);

router.get("/runtime", getGeneratorRuntime);

router.get("/maintenance", getMaintenanceReport);

router.get("/emissions", getGeneratorEmissions);

router.get("/site/:siteName", getGeneratorSite);

export default router;