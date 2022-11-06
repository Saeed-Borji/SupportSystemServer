import Joi from 'joi'
import httpStatus from 'http-status'
import pick from '../utility/pick.js'
import ApiError from '../utility/ApiError.js'

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

export default validate