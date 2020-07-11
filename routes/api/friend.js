const express = require("express");
const router = express.Router();

/**
 * @route   POST /api/friends/add
 * @desc    Add Friend for User
 * @access  Private
 */
router.post("/add", (req, res) => {
  res.send("Add Friend for User");
});

/**
 * @route   POST /api/friends/remove
 * @desc    Remove Friend from User
 * @access  Private
 */
router.post("/remove", (req, res) => {
  res.send("Remove Friend from User");
});

module.exports = router;
