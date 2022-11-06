import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/config.js";
import logger from "./config/logger.js";

// Start the server after connected to the DB
let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info("Connected to MongoDB");
  server = app.listen(config.port, "192.168.1.61", () => {
    const host = server.address().address;
    const port = server.address().port;
    logger.info(`Listening at: http://${host}:${port}`);
  });
});

// Provide a graceful way to exit the app
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  server && server.close();
});
