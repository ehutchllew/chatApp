import express, { Application } from "express";
import http from "http";
import path from "path";
import socketio from "socket.io";

const app: Application = express();
const server = http.createServer(app);
const io = socketio(server);

const publicDir = path.join(__dirname + "/public");

app.use(express.json());
app.use(express.static(publicDir));
app.disable("x-powered-by");

io.on("connection", (socket) => {
    console.log("New WebSocket connection");
    socket.broadcast.emit("message", "A new user has joined!");
    socket.on("sendMessage", (message: string, callback) => {
        io.emit("message", message);
        if (callback) {
            callback("Message Received");
        }
    });

    socket.on("sendLocation", (coords) => {
        socket.broadcast.emit(
            "message",
            `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
        );
    });

    socket.on("disconnect", () => {
        io.emit("userDisconnected", "A user has left!");
    });
});

export { app, server };
