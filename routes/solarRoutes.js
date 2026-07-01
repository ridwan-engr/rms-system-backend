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

}

from "../controllers/solarController.js";

import {

    requireAuth

}

from "../middlewares/authMiddleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Analytics
|--------------------------------------------------------------------------
*/

router.get("/dashboard", requireAuth, getSolarDashboard);

router.get("/live", requireAuth, getLiveSolar);

router.get("/trend", requireAuth, getSolarTrend);

router.get("/ranking", requireAuth, getSolarRanking);

router.get("/site/:siteName", requireAuth, getSolarSite);

/*
|--------------------------------------------------------------------------
| CRUD
|--------------------------------------------------------------------------
*/

router.get("/", requireAuth, getSolarPlants);

router.get("/:id", requireAuth, getSolarPlant);

router.post("/", requireAuth, createSolarPlant);

router.patch("/:id", requireAuth, updateSolarPlant);

router.delete("/:id", requireAuth, deleteSolarPlant);

export default router;