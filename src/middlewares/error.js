import mongoose from 'mongoose'
import httpStatus from 'http-status'
import config from '../config/config.js'
import logger from '../config/logger.js'
import ApiError from '../utility/ApiError.js'

const errorConverter = (err, req, res, next) => {
  if (err instanceof ApiError) {
    next(err);
    return;
  }

  const statusCode = err.statusCode || err instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || httpStatus[statusCode];
  
  next(new ApiError(statusCode, message, false, err.stack));
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

export {
  errorConverter,
  errorHandler
}