// src/middleware/errorHandler.js
export const errorHandler = (err, req, res, _next) => {
  const status = err.status || 500;
  const message = err.expose ? err.message : err.message || "Error interno";
  res.status(status).json({ error: message });
};
