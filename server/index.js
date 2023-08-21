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
        socket.emit("getSocketId", 'full')
        socket.disconnect(true);
    }

    console.log(`connected ${socket.id}`);
    socket.emit("getSocketId", socket.id);

    socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
        players = players.filter((p) => p.extraData.playerId !== socket.id)
        console.log({length: players.length});
        io.sockets.emit("disconnectedPlayer", socket.id);
    });


    socket.on('registerPlayer', (player) => {
        console.log({registeredPlayer: player.extraData.playerId});
        const isPlayerExists = !!players.find((p) => p.extraData.playerId === player.extraData.playerId)
        if (!isPlayerExists && players.length < 3) {
            players.push(player);
        }
        console.log(players.length)
        io.sockets.emit("updatePlayers", players);
    });

    socket.on('updatePlayer', (player) => {
        io.sockets.emit('broadcastMoves', player)
        console.log(player);
    })
    socket.on('updateOpponent', (opponent) => {
        io.sockets.emit('broadcastMoves', opponent)
        console.log(opponent);
    })
});

httpServer.listen(3000);