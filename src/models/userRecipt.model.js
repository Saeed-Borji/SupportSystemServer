import mongoose from "mongoose";
import validator from "validator";

const userReciptSchema = mongoose.Schema(
  {
    fileName: {
      type: String,
      default: null,
    },
    path: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

// Rename _id field to id
userReciptSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model("UserRecipt", userReciptSchema);
