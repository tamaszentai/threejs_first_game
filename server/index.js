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
let players = [];

io.on("connection", (socket) => {
    if (players.length >= 2) {
        socket.emit("message", 'full')
        socket.disconnect(true);
    }

    console.log(`connect ${socket.id}`);
    socket.emit("message", socket.id);

    socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
        players = players.filter((p) => p.extraData.playerId !== socket.id)
        console.log({length: players.length});
        io.sockets.emit("updatePlayers", players.length);
    });

    socket.on('player', (player) => {
        if (players.length === 0) {
            const existingPlayerIndex = players.findIndex((p) => p.extraData.playerId === player.extraData.playerId);
            if (existingPlayerIndex !== -1) {
                players[existingPlayerIndex] = player;
            } else {
                players[0] = player;
            }
        }

        if (players.length === 1) {
            const existingPlayerIndex = players.findIndex((p) => p.extraData.playerId === player.extraData.playerId);
            if (existingPlayerIndex !== -1) {
                players[existingPlayerIndex] = player;
            } else {
                players[1] = player;
            }
        }


        // if (players.length < 2) {
        //     const existingPlayerIndex = players.findIndex((p) => p.extraData.playerId === player.extraData.playerId);
        //     if (existingPlayerIndex !== -1) {
        //         players[existingPlayerIndex] = player;
        //     } else {
        //         players.push(player);
        //     }
        // } else {
        //     socket.disconnect()
        // }

        io.sockets.emit("updatePlayers", players);
    });
});

httpServer.listen(3000);