import dns from "node:dns";
import { env } from "./env.js";

const GOOGLE_DNS_SERVERS = ["8.8.8.8", "8.8.4.4"];

if (env.mongoUri.startsWith("mongodb+srv://")) {
  dns.setServers(GOOGLE_DNS_SERVERS);
}