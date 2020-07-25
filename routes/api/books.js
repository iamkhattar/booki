const express = require("express");
const router = express.Router();
const axios = require("axios");
const auth = require("../../middleware/auth");
const Book = require("../../models/Book");
const { check, validationResult } = require("express-validator");

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
 * @route   POST /api/books/review
 * @desc    Add a Review for a Book
 * @access  Private
 */
router.post("/review", [auth,
  [check("description", "Please include the books description").not().isEmpty()],
  [check("rating", "Please include the books rating").not().isEmpty()],
  [check("isbn", "Please include the books isbn").not().isEmpty()],
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { description, rating, isbn } = req.body;
  if (rating < 0 || rating > 10) {
    return res.status(500).send("rating must be between 0 and 10");
  }
  try {

    let book = await Book.findOne({ isbn: isbn });
    if (!book) {
      return res.status(500).send("Book not in system");
    };

    // check if user has already left a review for this book
    // if they do, update the current review
    for (let i = 0; i < book.reviews.length; i++) {
      if (book.reviews[i].userID == req.user.id) {
        book.reviews[i].message = description;
        book.reviews[i].rating = rating;
        await book.save();
        return res.status(200).send("updated");
      }
    }

    // add review for the current user
    book.reviews.unshift(
      {
        userID: req.user.id,
        message: description,
        rating: rating
      });

    await book.save();
    return res.json(book);

  } catch (e) {
    return res.status(500).send("Server Error");
  }
});

/**
 * @route   POST /api/books/add
 * @desc    Add an unseen Book
 * @access  Private
 */
router.post("/add", [auth,
  [check("isbn", "Please include the books isbn").not().isEmpty()]]
  , async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { isbn } = req.body;
    let present = await Book.findOne({ isbn: isbn });

    if (present) {
      return res.status(500).json("Book already in system");
    }
    const book = new Book({ isbn });
    try {
      book.save();
      return res.json(book);
    } catch (e) {
      return res.status(500).send("Server Error");
    }
  });

/**
 * @route   get /api/books/review
 * @desc    get a Reviews for a Book
 * @access  Public
 */
router.get("/review", async (req, res) => {
  
  const { isbn } = req.body;
  let book = await Book.findOne({ isbn: isbn });

  if (book) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(500).send("book not in system");
  }
})

module.exports = router;
