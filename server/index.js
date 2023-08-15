import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

io.on("connection", (socket) => {
    console.log(`connect ${socket.id}`);

    socket.emit("message", socket.id);

    socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
    });

    socket.on('forward', (arg) => {
        console.log(arg);
    })
});

httpServer.listen(3000);