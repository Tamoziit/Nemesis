import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); //to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser()); //to parse cookies anywhere in the app.

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//For Deployment
app.use(express.static(path.join(__dirname, "/frontend/dist"))); //for deployment purposes. express.static() --> bundles all frontend files into dist as static files.

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html")); //This script makes sure that both the backend & frontend run on only one server, i.e, localhost:5000 ---> all routes api & app are segregated automatically. And indx.html is rendered on all routes ("*"), except the api endpoints routes. 
})

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is listening on port ${PORT}`);
});