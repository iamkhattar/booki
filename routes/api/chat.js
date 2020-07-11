const express = require("express");
const router = express.Router();

/**
 * @route   POST /api/user/friends/remove
 * @desc    Send Message to Group Chat
 * @access  Private
 */
router.post("/message", (req, res) => {
  res.send("Endpoint to Send Messages");
});

/**
 * @route   GET /api/groups/fetch
 * @desc    Get Group Chat Messages
 * @access  Private
 */
router.get("/fetch", (req, res) => {
  res.send("Endpoint to get all Group Chat Messages");
});

module.exports = router;
