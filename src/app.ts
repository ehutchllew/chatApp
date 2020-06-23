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

let count = 0;
io.on("connection", (socket) => {
    console.log("New WebSocket connection");

    socket.emit("countUpdated", count);

    socket.on("incrementCount", () => {
        /**
         * Here we use `io` instead of `socket` because
         * io will emit to EVERY connection, whereas socket
         * refers to the particular connection that it is
         * currently interacting with (think scope).
         */
        io.emit("countUpdated", ++count);
    });
});

export { app, server };
