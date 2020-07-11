const express = require("express");
const router = express.Router();

/**
 * @route   POST /api/user/register
 * @desc    Register a User
 * @access  Public
 */
router.post("/register", (req, res) => {
  res.send("Endpoint to Register A User");
});

/**
 * @route   POST /api/user/login
 * @desc    Login a User
 * @access  Public
 */
router.post("/login", (req, res) => {
  res.send("Endpoint to Login A User");
});

/**
 * @route   GET /api/user/fetch
 * @desc    Get a Users Details
 * @access  Private
 */
router.get("/fetch", (req, res) => {
  res.send("Endpoint to Get Users Details");
});

/**
 * @route   PUT /api/user/password
 * @desc    Change Password for a User
 * @access  Private
 */
router.put("/password", (req, res) => {
  res.send("Endpoint to Change Password");
});

/**
 * @route   POST /api/user/password
 * @desc    Forget Password for a User
 * @access  Public
 */
router.post("/password", (req, res) => {
  res.send("Endpoint to Forget Password");
});

/**
 * @route   POST /api/user/points
 * @desc    Add Points to User Profile
 * @access  Private
 */
router.post("/points", (req, res) => {
  res.send("Add Points to User Profile");
});

module.exports = router;
