import dns from "dns"; 

import app from "./app.js";

import { connectDatabase } from "./config/db.js";

import { env } from "./config/env.js";

import { logger } from "./utils/logger.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function startServer() {

  try {

    await connectDatabase();

    app.listen(
      env.port,
      () => {

        logger.success(
          `RMS-SYSTEM Server Running on http://localhost:${env.port}`
        );

      }
    );

  } catch (error) {

    logger.error(
      `Server Startup Failed: ${error.message}`
    );

    process.exit(1);

  }

}

startServer();
