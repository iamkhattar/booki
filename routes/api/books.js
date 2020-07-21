const express = require("express");
const router = express.Router();
const axios = require("axios");
const auth = require("../../middleware/auth");
const Book = require("../../models/Book");

/**
 * @route   GET /api/books/search/:query
 * @desc    Search for a book
 * @access  Public
 */
router.get("/search/:query", async (req, res) => {
  const { query } = req.params;
  try {
    const googleAPIResponse = await axios.get(
      "https://www.googleapis.com/books/v1/volumes?q=" + query
    );
    const items = googleAPIResponse.data.items;
    res.send(items);
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

/**
 * @route   POST /api/books/rating
 * @desc    Add a Rating for a Book
 * @access  Private
 */
router.post("/rating", (req, res) => {
  res.send("Endpoint to add rating");
});

/**
 * @route   POST /api/books/review
 * @desc    Add a Review for a Book
 * @access  Private
 */
router.post("/review", (req, res) => {
  res.send("Endpoint to add review");
});

/**
 * @route   POST /api/books/add
 * @desc    Add an unseen Book
 * @access  Private
 */
router.post("/add", auth, async (req, res) => {

  const { isbn } = req.body;

  if (!isbn) {
    return res.status(500).send("Invalid ISBN");
  }

  let present = await Book.findOne({ isbn: isbn });

  if (present) {
    res.status(500).json("Book already in system");
  } else {
    const book = new Book({ isbn });
    try {
      book.save();
      return res.json(book);
    } catch (e) {
      return res.status(500).send("Server Error");
    }

  }

});

module.exports = router;
