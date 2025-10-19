import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Connected to backend:", socket.id);
});
socket.on("disconnect", () => {
  console.log("Disconnected from backend");
});

socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err);
});
