import { getCodes } from 'country-list'
import validator from 'validator'

const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return helpers.message('"{{#label}}" must be a valid id');
    }
    return value;
};

const countryCode = (value, helpers) => {
    if (getCodes().find(elem=>elem === value)) {
        return value;
    }

    return helpers.message('Invalid country code');
};

const postalCode = (value, helpers) => {
    if(validator.isNumeric(value, {no_symbols: true})){
        return value;
    }

    return helpers.message('Postal code must only contain digits');
};

export default{
    objectId,
    countryCode,
    postalCode
}