import mongoose from "mongoose";
import validator from "validator";
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = mongoose.Schema(
  {
    checked: {
      type: String,
      default: null,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    accountType: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    bankAccountNumber: {
      type: String,
      required: true,
    },
    bankAccountName: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    // email: {
    //   type: String,
    //   default: null,
    //   validate(value) {
    //     if (value && !validator.isEmail(value)) {
    //       throw new Error("Invalid email address");
    //     }
    //   },
    // },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator)

// Rename _id field to id
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model("User", userSchema);
