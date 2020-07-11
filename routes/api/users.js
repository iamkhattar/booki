const express = require("express");
const router = express.Router();

/**
 * @route   POST /api/users/register
 * @desc    Register a User
 * @access  Public
 */
router.post("/register", (req, res) => {
  res.send("Endpoint to Register A User");
});

module.exports = router;
