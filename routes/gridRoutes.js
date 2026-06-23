import { Router } from "express";

import {
  createGridRecord,
  getGridRecords,
  getGridRecord,
  updateGridRecord,
  deleteGridRecord,
  getGridStatus
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

export default router;