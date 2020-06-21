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

app.get("/", (req, res) => {
    res.sendFile(publicDir + "/index.html");
});

io.on("connection", () => {
    console.log("New WebSocket connection");
});

export { app, server };
