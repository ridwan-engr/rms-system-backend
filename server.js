import dns from "dns"; 

import app from "./app.js";

import http from "http";

import { connectDatabase } from "./config/db.js";

import { env } from "./config/env.js";

import { logger } from "./utils/logger.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function startServer() {

    try {

        await connectDatabase();

        const server = http.createServer(app);

        server.listen(PORT, () => {

            console.log("");

            console.log("===================================");

            console.log("RMS Backend Started");

            console.log(`Port : ${PORT}`);

            console.log(`Environment : ${process.env.NODE_ENV}`);

            console.log("===================================");

        });

    }

    catch (error) {

        console.error(error);

        process.exit(1);

    }

}

startServer()
