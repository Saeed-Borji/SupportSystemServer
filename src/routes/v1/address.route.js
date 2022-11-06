import express from 'express'
import validate from '../../middlewares/validate.js'
import addressValidation from '../../validations/address.validation.js'
import AddressController from '../../controllers/AddressController.js'
import catchAsync from '../../utility/catchAsync.js'

const router = express.Router();

router
  .route('/')
  .post(validate(addressValidation.create), catchAsync(AddressController.create))
  .get(catchAsync(AddressController.all));

router
  .route('/:id')
  .get(validate(addressValidation.get), catchAsync(AddressController.get))
  .patch(validate(addressValidation.update), catchAsync(AddressController.update))
  .delete(validate(addressValidation.delete), catchAsync(AddressController.delete));


export default router