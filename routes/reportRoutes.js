import { Router } from "express";

import {
  createReport,
  getReports,
  getReport,
  updateReport,
  deleteReport,
  getOverallReport,
  getEnergyReport,
  getFuelReport,
  getEmissionReport,
  getReliabilityReport,
  getExecutiveSummary
} from "../controllers/reportController.js";

import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

/* ============================================================
 * Report Analytics
 * ============================================================
 */

router.get("/overall", requireAuth, getOverallReport);

router.get("/energy", requireAuth, getEnergyReport);

router.get("/fuel", requireAuth, getFuelReport);

router.get("/emissions", requireAuth, getEmissionReport);

router.get("/reliability", requireAuth, getReliabilityReport);

router.get("/executive", requireAuth, getExecutiveSummary);

/* ============================================================
 * CRUD
 * ============================================================
 */

router.get("/", requireAuth, getReports);

router.get("/:id", requireAuth, getReport);

router.post("/", requireAuth, createReport);

router.patch("/:id", requireAuth, updateReport);

router.delete("/:id", requireAuth, deleteReport);

export default router;