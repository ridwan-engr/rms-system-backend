import { Router } from "express";

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
import authRoutes from "../auth/authRoutes.js";


const router = Router();

router.use("/dashboard", dashboardRoutes);

router.use("/analytics", analyticsRoutes);

router.use("/monitoring", monitoringRoutes);

router.use("/solar", solarRoutes);

router.use("/battery", batteryRoutes);

router.use("/generator", generatorRoutes);

router.use("/grid", gridRoutes);

router.use("/reliability", reliabilityRoutes);

router.use("/reports", reportRoutes);

router.use("/forecast", forecastRoutes);

router.use(

    "/auth",

    authRoutes

);

export default router;