import Joi from 'joi'
import customValidation from './custom.validation.js'
import addressStatus from '../constants/address.status.js'

const get = {
    params: Joi.object().keys({
        id: Joi.string().custom(customValidation.objectId),
    }),
};

const create = {
    body: Joi.object().keys({
        country: Joi.string().required().trim().uppercase().custom(customValidation.countryCode),
        postalcode: Joi.string().required().length(5).custom(customValidation.postalCode),
        city: Joi.string().required().trim().min(1),
        street: Joi.string().required().trim().min(1),
        number: Joi.number().required().integer().min(0),
        numberAddition: Joi.string().required().allow('')
    }),
};

const update = {
    params: Joi.object().keys({
        id: Joi.string().custom(customValidation.objectId),
    }),
    body: Joi.object().keys({
        status: Joi.string().required().trim().valid(addressStatus.NOT_AT_HOME, addressStatus.NOT_INTERESTED, addressStatus.INTERESTED),
        name: Joi.string().trim(),
        email: Joi.string().trim().email()
    }),
};

const remove = {
    params: Joi.object().keys({
        id: Joi.string().custom(customValidation.objectId),
    })
};


export default {
    get,
    create,
    update,
    remove
}