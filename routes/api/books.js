const express = require("express");
const router = express.Router();
const axios = require("axios");

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

module.exports = router;
