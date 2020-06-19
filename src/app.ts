import express, { Application } from "express";
import path from "path";

const app: Application = express();

const publicDir = path.join(__dirname + "/public");

app.use(express.json());
app.use(express.static(publicDir));
app.disable("x-powered-by");

app.get("/", (req, res, next) => {
    res.sendFile(publicDir + "/index.html");
});

export { app };
