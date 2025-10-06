const express = require("express");
const bookRouter = express.Router();
const Book = require("../models/book.model");
const { default: mongoose } = require("mongoose");

// Add a book
bookRouter.post("/add", async (req, res) => {
  try {
    const { title, author, type, program, fileUrl } = req.body;
    const exists = await Book.findOne({ title, author });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Book already exists",
      });
    }

    const book = new Book({ title, author, type, program, fileUrl });
    await book.save();
    res.status(201).json({
      success: true,
      message: "Book Added Successfully",
      book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// List all book
bookRouter.get("/list", async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length === 0) {
      return res.status(400).json({
        message: "No Books Found",
      });
    }
    res.status(200).json({ success: true, books });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

// Get a book by id
bookRouter.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book Not Found",
      });
    }
    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete a book by id
bookRouter.delete("/del/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({
      success: false,
      message: "Invalid Product ID",
    });
  }
  try {
    await Book.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = bookRouter;
