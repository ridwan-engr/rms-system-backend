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

import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

/* ============================================================
 * Analytics
 * ============================================================
 */

router.get("/dashboard", requireAuth, getGeneratorDashboard);

router.get("/live", requireAuth, getLiveGenerator);

router.get("/fuel", requireAuth, getGeneratorFuel);

router.get("/health", requireAuth, getGeneratorHealth);

router.get("/runtime", requireAuth, getGeneratorRuntime);

router.get("/maintenance", requireAuth, getMaintenanceReport);

router.get("/emissions", requireAuth, getGeneratorEmissions);

router.get("/site/:siteName", requireAuth, getGeneratorSite);

/* ============================================================
 * CRUD
 * ============================================================
 */

router.get("/", requireAuth, getGenerators);

router.get("/:id", requireAuth, getGenerator);

router.post("/", requireAuth, createGenerator);

router.patch("/:id", requireAuth, updateGenerator);

router.delete("/:id", requireAuth, deleteGenerator);

export default router;