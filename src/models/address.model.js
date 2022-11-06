import mongoose from 'mongoose'
import { getCodes } from 'country-list'
import validator from 'validator'

function allowEmptyStrings (value) {
    return typeof value !== 'string'
}

const addressSchema = mongoose.Schema({
    country: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        validate(value) {
            if (!getCodes().find(elem=>elem === value)) {
                throw new Error('Invalid country');
            }
        },
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    street: {
        type: String,
        required: true,
        trim: true
    },
    postalcode: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 5,
        validate : {
            validator : v => validator.isNumeric(v, {no_symbols: true}),
            message   : '{VALUE} is not a valid postal code'
        }
    },
    number: {
        type: Number,
        required: true,
        min: 0,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    numberAddition: {
        type: String,
        required: function(){ return allowEmptyStrings(this.numberAddition) }
    },
    status: {
        type: String,
        default : null
    },
    name: {
        type: String,
        default : null
    },
    email: {
        type: String,
        default : null,
        validate(value) {
            if (value && !validator.isEmail(value)) {
                throw new Error('Invalid email address');
            }
        },
    },
}, 
{ timestamps: true } );

// Rename _id field to id
addressSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

const Address = mongoose.model('Address', addressSchema);

export default Address
