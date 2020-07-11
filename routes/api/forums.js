const express = require("express");
const router = express.Router();

/**
 * @route   POST /api/groups/forums/message
 * @desc    Send Message to Group Forum
 * @access  Private
 */
router.post("/message", (req, res) => {
  res.send("Endpoint to Send Messages to Group Forum");
});

/**
 * @route   GET /api/groups/forums/fetch
 * @desc    Get Group Forum Messages
 * @access  Private
 */
router.get("/fetch", (req, res) => {
  res.send("Endpoint to get all to Group Forum");
});

module.exports = router;
