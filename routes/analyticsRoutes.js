import { Router }
from "express";

import {
  getSAIDI,
  getSAIFI,
  getENS,
  getLOLP,
  getRecoveryTime,
  getCriticalLoad,
  getResilience,
  getEnergyMix
}
from "../controllers/analyticsController.js";

import {
  requireAuth
}
from "../middleware/authMiddleware.js";

const router =
  Router();

router.get(
  "/saidi",
  requireAuth,
  getSAIDI
);

router.get(
  "/saifi",
  requireAuth,
  getSAIFI
);

router.get(
  "/ens",
  requireAuth,
  getENS
);

router.get(
  "/lolp",
  requireAuth,
  getLOLP
);

router.get(
  "/recovery",
  requireAuth,
  getRecoveryTime
);

router.get(
  "/critical-load",
  requireAuth,
  getCriticalLoad
);

router.get(
  "/resilience",
  requireAuth,
  getResilience
);

router.get(
  "/energy-mix",
  requireAuth,
  getEnergyMix
);

export default router;