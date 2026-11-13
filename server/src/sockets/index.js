import { Server } from "socket.io";
import { env } from "../config/env.js";
import { EVENTS } from "./events.js";

export function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: env.clientUrl, credentials: true },
  });

  io.on("connection", (socket) => {
    console.log(`socket connected: ${socket.id}`);

    socket.on(EVENTS.SYSTEM.PING, (ack) => {
      if (typeof ack === "function") {
        ack({ pong: true, socketId: socket.id, at: Date.now() });
      }
    });

    socket.on("disconnect", (reason) => {
      console.log(`socket disconnected: ${socket.id} (${reason})`);
    });
  });

  return io;
}