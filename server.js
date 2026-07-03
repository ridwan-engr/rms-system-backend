import dns from "dns";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";

dns.setServers(["8.8.8.8","8.8.4.4"]);

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:[
            "http://localhost:5173",
            "https://rms-system-3cai.onrender.com"
        ],
        credentials:true
    }
});

app.set("io",io);

app.use((req,res,next)=>{
    req.io=io;
    next();
});

io.on("connection",(socket)=>{

    logger.info(`Socket Connected ${socket.id}`);

    socket.on("disconnect",()=>{

        logger.info(`Socket Disconnected ${socket.id}`);

    });

});

async function startServer(){

    try{

        await connectDatabase();

        server.listen(env.port,()=>{

            logger.success(
                `Server running on port ${env.port}`
            );

        });

    }

    catch(error){

        logger.error(error.message);

        process.exit(1);

    }

}

startServer();