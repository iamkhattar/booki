const express = require("express");
const router = express.Router();

/**
 * @route   POST /api/user/auth/register
 * @desc    Register a User
 * @access  Public
 */
router.post("/register", (req, res) => {
  res.send("Endpoint to Register A User");
});

/**
 * @route   POST /api/user/auth/login
 * @desc    Login a User
 * @access  Public
 */
router.post("/login", (req, res) => {
  res.send("Endpoint to Login A User");
});

/**
 * @route   GET /api/user/auth/fetch
 * @desc    Get a Users Details
 * @access  Private
 */
router.get("/fetch", (req, res) => {
  res.send("Endpoint to Get Users Details");
});

module.exports = router;
