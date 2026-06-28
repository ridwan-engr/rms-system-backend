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

import {
  requireAuth
} from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/",
  requireAuth,
  getReports
);

router.get(
  "/:id",
  requireAuth,
  getReport
);

router.post(
  "/",
  requireAuth,
  createReport
);

router.patch(
  "/:id",
  requireAuth,
  updateReport
);

router.delete(
  "/:id",
  requireAuth,
  deleteReport
);

router.get("/", getOverallReport);

router.get("/energy", getEnergyReport);

router.get("/fuel", getFuelReport);

router.get("/emissions", getEmissionReport);

router.get("/reliability", getReliabilityReport);

router.get("/executive", getExecutiveSummary);

export default router;