const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: {
        values: ["book", "note"],
      },
    },
    program: {
      type: String,
      required: true,
      enum: {
        values: ["CSIT", "BIT", "BCA"],
      },
    },
    semester: {
      type: Number,
      min: 1,
      max: 8,
    },
    fileUrl: {
      type: String,
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

bookSchema.index({ title: 1 });

module.exports = mongoose.model("Book", bookSchema);
