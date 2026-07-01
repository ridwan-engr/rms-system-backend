import { Router } from "express";

import {
  createGridRecord,
  getGridRecords,
  getGridRecord,
  updateGridRecord,
  deleteGridRecord,
  getGridStatus,
  getGridDashboard,
  getLiveGrid,
  getVoltageTrend,
  getFrequencyTrend,
  getImportExport,
  getGridAvailability,
  getGridOutages,
  getGridSite
} from "../controllers/gridController.js";

import {
  requireAuth
} from "../middlewares/authMiddleware.js";

const router = Router();

/* ============================================================
 * Analytics
 * ============================================================
 */

router.get("/dashboard", requireAuth, getGridDashboard);

router.get("/status", requireAuth, getGridStatus);

router.get("/live", requireAuth, getLiveGrid);

router.get("/voltage", requireAuth, getVoltageTrend);

router.get("/frequency", requireAuth, getFrequencyTrend);

router.get("/import-export", requireAuth, getImportExport);

router.get("/availability", requireAuth, getGridAvailability);

router.get("/outages", requireAuth, getGridOutages);

router.get("/site/:siteName", requireAuth, getGridSite);

/* ============================================================
 * CRUD
 * ============================================================
 */

router.get("/", requireAuth, getGridRecords);

router.get("/:id", requireAuth, getGridRecord);

router.post("/", requireAuth, createGridRecord);

router.patch("/:id", requireAuth, updateGridRecord);

router.delete("/:id", requireAuth, deleteGridRecord);

export default router;