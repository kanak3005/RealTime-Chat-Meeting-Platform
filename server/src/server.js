
import dns from "node:dns";

// Configure custom DNS servers
dns.setServers(["1.1.1.1", "1.0.0.1"]);

import { createServer } from "node:http";
import { Server } from "socket.io";
import http from "http";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { app } from "./app.js";
import { initSocket } from "./sockets/index.js";

async function start() {
  await connectDB();

  const httpServer = http.createServer(app);
  initSocket(httpServer);

  httpServer.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port} (${env.nodeEnv})`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});