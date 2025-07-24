import express from "express";
import http from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";

// Variables de entorno
import dotenv from "dotenv";
dotenv.config();

import productsRouter from "./routes/products.routes.js";
import viewsRouter from "./routes/views.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import usersRouter from "./routes/users.routes.js";
import sessionsRouter from "./routes/sessions.routes.js";

import setupWebSockets from "./sockets/socketHandler.js";

import connectMongoDB from "./config/db.js";
import passport from "./config/passport.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
setupWebSockets(io);

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(passport.initialize());

// DB
connectMongoDB();

// Endpoints
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouter);

// Server
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log("Servidor iniciado en puerto:", PORT);
});
