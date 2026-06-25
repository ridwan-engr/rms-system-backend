import { Router }
from "express";

import {createAnalytics, 
    getAnalytics,
    updateAnalytics
}
from "../controllers/analyticsController.js";

import {
  requireAuth
}
from "../middleware/authMiddleware.js";

const router =
  Router();

router.get(
  "/analytics",
  requireAuth,
  getAnalytics
);

router.post(
  "/analytics",
  requireAuth,
  createAnalytics
);

router.patch(
  "/analytics/:id",
  requireAuth,
  updateAnalytics
);

export default router;