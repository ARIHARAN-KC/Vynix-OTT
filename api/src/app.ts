import express, { Request, Response, RequestHandler } from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import logger from "morgan";
import url from "url";
import path from "path";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./api/routes/index.js";
import {
  normalizePort,
  onError,
  onListening,
  errorHandler,
  handle404,
} from "./appHelper.js";
import db from "./models/index.js";
import passport from "./config/passport.js";
import s3 from "./utils/file-s3.js";
import { Server as SocketIOServer } from "socket.io";


export const app = express();
export const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

export const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
server.on("error", onError);
server.on("listening", onListening);

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
dotenv.config();

try {
  await db.sequelize.authenticate();
  console.log("Connection established");
} catch (error) {
  console.error("Unable to connect to database:", error);
}

try {
  await db.sequelize.sync();
  console.log("All models were synchronized successfully.");
} catch (error) {
  console.error("Unable to synchronize models:", error);
}

try {
  await s3.init();
  console.log("S3 connected successfully.");
} catch (error) {
  console.error("Unable to connect to S3:", error);
}

app.use(logger("dev"));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? undefined : "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    secret: "veryveryveryimportantsecret",
    name: "veryveryverysecretname",
    cookie: {
      httpOnly: true,
      sameSite: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: true,
  }) as unknown as RequestHandler
);

app.use("/static", express.static(path.join(__dirname, "../../web/static")));
app.use("/assets", express.static(path.join(__dirname, "../../web/assets")));
app.use("/favicon", express.static(path.join(__dirname, "../../web/favicon")));
app.use("/api/v1", router);


export const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.NODE_ENV === "production" ? undefined : "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const frontendPath = path.resolve(__dirname, "../../web");
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.use(handle404);
app.use(errorHandler);
