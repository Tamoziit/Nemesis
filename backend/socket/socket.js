import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

//Mounting socket.io server on top of our main backend server
const server = http.createServer(app);
const io = new Server(server, {
    cors: { //removing cors errors
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]; //id of the receiver of the message
}

const userSocketMap = {}; //to map {userId: socketId} (Hashmap Data structure)

io.on("connection", (socket) => { //socket - an user that is connected to the server
    console.log("User connected", socket.id);

    const userId = socket.handshake.query.userId; //fetching the query or userId from client side
    if (userId != "undefined") userSocketMap[userId] = socket.id; //mapping socket id to authUser id

    io.emit("getOnlineUsers", Object.keys(userSocketMap)); //io.emit() is used to send events to all connected clients.

    //socket.on() is used to losten to the events. It can be on both client & server side.
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); //updated connected users map
    });
});

export { app, io, server };