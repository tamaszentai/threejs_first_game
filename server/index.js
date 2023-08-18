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
let players = [{extraData: {
    playerId: 121212
    }}];

io.on("connection", (socket) => {
    console.log(`connect ${socket.id}`);

    socket.emit("message", socket.id);

    socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
        players = players.filter((p) => p.extraData.playerId === socket.id)
        io.sockets.emit("updatePlayers", players);

    });

    socket.on('player', (player) => {
        const isPlayerExist = !!players.find((p) => p.extraData.playerId === player.extraData.playerId);
        if (!isPlayerExist) {
            players.push(player)
        } else {
            player = players.find((p) => p.extraData.playerId === player.extraData.playerId);
        }
        io.sockets.emit("updatePlayers", players);
    })
});

httpServer.listen(3000);