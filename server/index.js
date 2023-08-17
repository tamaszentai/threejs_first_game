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
const players = [];

io.on("connection", (socket) => {
    console.log(`connect ${socket.id}`);

    socket.emit("message", socket.id);

    socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
    });

    socket.on('player', (player) => {
        let existingPlayer = players.find((p) => p.playerId === player.playerId);
        const index = players.indexOf(existingPlayer);
        if (existingPlayer) {
            players[index] = player;
        } else {
            players.push(player);
        }
        console.log(players);
        socket.emit("updatePlayers", players);
    })
});

httpServer.listen(3000);