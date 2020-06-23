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

    socket.on("sendChat", (message: string) => {
        io.emit("newChat", message);
    });
});

export { app, server };
