import express from "express";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";
import httpStatus from "http-status";
import routes from "./routes/v1/index.js";
import { errorConverter, errorHandler } from "./middlewares/error.js";
import ApiError from "./utility/ApiError.js";
//import jsonOnly from "./middlewares/json-only.js";
import urlUtils from "./middlewares/url.js";

const app = express();

// set security HTTP headers
app.use(helmet());

// Only allow application/json content-type in POST/PATCH
//app.use(jsonOnly);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// Add utility url functions to the request object
app.use(urlUtils);

// api routes
app.use(routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
