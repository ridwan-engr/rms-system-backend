import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes.js";
import siteRoutes from "./routes/siteRoutes.js";
import solarRoutes from "./routes/solarRoutes.js";
import batteryRoutes from "./routes/batteryRoutes.js";
import generatorRoutes from "./routes/generatorRoutes.js";
import forecastRoutes from "./routes/forecastRoutes.js";
import energyRoutes from "./routes/energyRoutes.js";
import faultRoutes from "./routes/faultRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import gridRoutes from "./routes/gridRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";


import {
  notFoundHandler,
  errorHandler
} from "./middleware/errorMiddleware.js";

const app = express();

/*
|--------------------------------------------------------------------------
| Security Middleware
|--------------------------------------------------------------------------
*/

app.use(helmet());

app.use(
  cors({
    origin: "*",
    credentials: true
  })
);

/*
|--------------------------------------------------------------------------
| Request Parsing
|--------------------------------------------------------------------------
*/

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

/*
|--------------------------------------------------------------------------
| Logging
|--------------------------------------------------------------------------
*/

app.use(morgan("dev"));

/*
|--------------------------------------------------------------------------
| Rate Limiting
|--------------------------------------------------------------------------
*/

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    message: {
      success: false,
      error:
        "Too many requests. Try again later."
    }
  })
);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    application:
      "HEMAP",
    description:
      "Hybrid Energy Management and Analytics Platform",
    version: "1.0.0",
    status: "Running",
    timestamp:
      new Date().toISOString()
  });
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use( "/api/auth", authRoutes );

app.use(
  "/api/sites",
  siteRoutes
);

app.use(
  "/api/solar",
  solarRoutes
);

app.use(
  "/api/batteries",
  batteryRoutes
);

app.use(
  "/api/generators",
  generatorRoutes
);

app.use(
  "/api/forecasts",
  forecastRoutes
);

app.use(
  "/api/energy",
  energyRoutes
);

app.use(
  "/api/faults",
  faultRoutes
);

app.use(
  "/api/reports",
  reportRoutes
);

app.use(
  "/api/grid",
  gridRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);

/*
|--------------------------------------------------------------------------
| Error Handling
|--------------------------------------------------------------------------
*/

app.use(
  notFoundHandler
);

app.use(
  errorHandler
);

export default app;