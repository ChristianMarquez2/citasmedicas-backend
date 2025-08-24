// src/middleware/metrics.js
import client from "prom-client";
const register = new client.Registry();
client.collectDefaultMetrics({ register });

export const metricsRoute = async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
};
