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
} from "../middleware/authMiddleware.js";

import {
  requireFields
} from "../middleware/validateRequest.js";

const router = Router();

//Get Grid Summary

router.get(
  "/status",
  requireAuth,
  getGridStatus
);


//Get All Records


router.get(
  "/",
  requireAuth,
  getGridRecords
);


//Get Single Record

router.get(
  "/:id",
  requireAuth,
  getGridRecord
);

//Create Record

router.post(
  "/",
  requireAuth,
  createGridRecord
);

//Update Record

router.patch(
  "/:id",
  requireAuth,
  updateGridRecord
);

//Delete Record

router.delete(
  "/:id",
  requireAuth,
  deleteGridRecord
);

router.get("/", getGridDashboard);

router.get("/live", getLiveGrid);

router.get("/voltage", getVoltageTrend);

router.get("/frequency", getFrequencyTrend);

router.get("/import-export", getImportExport);

router.get("/availability", getGridAvailability);

router.get("/outages", getGridOutages);

router.get("/site/:siteName", getGridSite);

export default router;