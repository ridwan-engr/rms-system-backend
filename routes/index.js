import { Router } from "express";

import authRoutes from "./authRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import analyticsRoutes from "./analyticsRoutes.js";
import monitoringRoutes from "./monitoringRoutes.js";
import solarRoutes from "./solarRoutes.js";
import batteryRoutes from "./batteryRoutes.js";
import generatorRoutes from "./generatorRoutes.js";
import gridRoutes from "./gridRoutes.js";
import reliabilityRoutes from "./reliabilityRoutes.js";
import reportRoutes from "./reportRoutes.js";
import forecastRoutes from "./forecastRoutes.js";

// Existing routes (if still required)
import siteRoutes from "./siteRoutes.js";
import energyRoutes from "./energyRoutes.js";
import faultRoutes from "./faultRoutes.js";

const router = Router();

router.use("/auth", authRoutes);

router.use("/dashboard", dashboardRoutes);

router.use("/analytics", analyticsRoutes);

router.use("/monitoring", monitoringRoutes);

router.use("/solar", solarRoutes);

router.use("/battery", batteryRoutes);

router.use("/generator", generatorRoutes);

router.use("/grid", gridRoutes);

router.use("/reliability", reliabilityRoutes);

router.use("/forecast", forecastRoutes);

router.use("/faults", faultRoutes);

router.use("/reports", reportRoutes);


// Existing APIs

router.use("/sites", siteRoutes);

router.use("/energy", energyRoutes);

export default router;