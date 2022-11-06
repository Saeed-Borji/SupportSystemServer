import httpStatus from 'http-status'
import ApiError from '../utility/ApiError.js'

const jsonOnly = (req, res, next) => {
    const methods = ["POST", "PATCH"];
    
    if (methods.includes(req.method) && !req.is('application/json'))
        throw new ApiError(httpStatus.UNSUPPORTED_MEDIA_TYPE, httpStatus[httpStatus.UNSUPPORTED_MEDIA_TYPE], true);

    next();
};

export default jsonOnly