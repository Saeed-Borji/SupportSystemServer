import express from "express";
// import validate from "../../middlewares/validate.js";
// import addressValidation from "../../validations/address.validation.js";
import UserController from "../../controllers/UserController.js";
import catchAsync from "../../utility/catchAsync.js";
import multer from "multer";

const upload = new multer({ dest: "uploads/" });

const router = express.Router();

router
  .route("/register")
  .post(upload.single("photo1"), catchAsync(UserController.create));

router
  .route("/login")
  .post(catchAsync(UserController.login));


// router
//   .route("/:id")
//   .get(validate(addressValidation.get), catchAsync(AddressController.get))
//   .patch(
//     validate(addressValidation.update),
//     catchAsync(AddressController.update)
//   )
//   .delete(
//     validate(addressValidation.delete),
//     catchAsync(AddressController.delete)
//   );

export default router;
