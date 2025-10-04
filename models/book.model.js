const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: {
        values: ["book", "note"],
        message: "Type must be either book or note",
      },
    },
    program: {
      type: String,
      required: true,
      enum: {
        values: ["CSIT", "BIT", "BCA"],
        message: "Program must be either CSIT,BCA or BIT",
      },
    },
    semester: {
      type: Number,
      min: 1,
      max: 8,
    },
    fileUrl: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [String],
    default: [],
  },
  {
    timestamps: true,
    strict: true,
  }
);

bookSchema.index({ title: 1 });

module.exports = mongoose.model("Book", bookSchema);
