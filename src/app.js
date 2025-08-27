// src/app.js
import express from "express";
import helmet from "helmet";
import compression from "compression";
import routes from "./routes/index.js";
import { corsMiddleware } from "./middleware/cors.js";
import { rateLimiter } from "./middleware/rateLimiter.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { metricsRoute } from "./middleware/metrics.js";


const app = express();
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(corsMiddleware);
app.use(requestLogger);
app.use(rateLimiter);

app.get("/metrics", metricsRoute);
app.use("/api/v1", routes);

// 404 simple
app.use((req, res) => res.status(404).json({ error: "No encontrado" }));
// manejador de errores
app.use(errorHandler);

export default app;
