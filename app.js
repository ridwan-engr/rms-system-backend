import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import routes from "./routes/index.js";

import requestLogger from "./middlewares/requestLogger.js";
import { notFoundHandler } from "./middlewares/errorMiddleware.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

/* ============================================================
 * Security Middleware
 * ============================================================
 */

app.use(helmet());

app.use(cors({

    origin: [

        "http://localhost:5173",

        "https://rms-system-3cai.onrender.com"

    ],

    credentials: true,

    methods: [

        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS"

    ],

    allowedHeaders: [

        "Content-Type",
        "Authorization"

    ]

}));

/* ============================================================
 * Body Parsing
 * ============================================================
 */

app.use(express.json({

    limit: "10mb"

}));

app.use(express.urlencoded({

    extended: true,

    limit: "10mb"

}));

/* ============================================================
 * Performance
 * ============================================================
 */

app.use(compression());

/* ============================================================
 * Logging
 * ============================================================
 */

app.use(morgan("dev"));

app.use(requestLogger);

/* ============================================================
 * Rate Limiting
 * ============================================================
 */

app.use(rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 500,

    standardHeaders: true,

    legacyHeaders: false,

    message: {

        success: false,

        message: "Too many requests. Please try again later."

    }

}));

/* ============================================================
 * Root Endpoint
 * ============================================================
 */

app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        application: "RMS",

        description: "REMOTE MONITORING SYSTEM",

        version: "1.0.0",

        status: "Running",

        timestamp: new Date().toISOString()

    });

});

/* ============================================================
 * Health Endpoint
 * ============================================================
 */

app.get("/health", (req, res) => {

    res.status(200).json({

        success: true,

        status: "Healthy",

        uptime: process.uptime(),

        timestamp: new Date().toISOString()

    });

});

/* ============================================================
 * API Gateway
 * ============================================================
 */

app.use("/api", routes);

/* ============================================================
 * 404 Handler
 * ============================================================
 */

app.use(notFoundHandler);

/* ============================================================
 * Global Error Handler
 * ============================================================
 */

app.use(errorHandler);

export default app;