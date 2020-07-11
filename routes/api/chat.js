const express = require("express");
const router = express.Router();

/**
 * @route   POST /api/groups/chat/message
 * @desc    Send Message to Group Chat
 * @access  Private
 */
router.post("/message", (req, res) => {
  res.send("Endpoint to Send Messages to Group Chat Messages");
});

/**
 * @route   GET /api/groups/chat/fetch
 * @desc    Get Group Chat Messages
 * @access  Private
 */
router.get("/fetch", (req, res) => {
  res.send("Endpoint to get all Group Chat Messages");
});

module.exports = router;
