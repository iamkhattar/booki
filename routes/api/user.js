const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

/**
 * @route   POST /api/user/register
 * @desc    Register a User
 * @access  Public
 */
router.post(
  "/register",
  [
    check("name", "Please include a name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("username", "Please include a username").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Request Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extracting Parameters from Request Body
    const { name, email, username, password } = req.body;

    try {
      // Check if Another User is registered with the same email
      let emailExists = await User.findOne({ email });
      if (emailExists) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email already in use" }] });
      }

      // Check if Another User is registered with the same username
      let usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Username already in use" }] });
      }

      // If User does not exist the registration is valid
      const user = new User({ name, username, email, password, points: 0 });

      // Hashing and Salting the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save the User in Database
      await user.save();

      // Prepare the Payload for JsonWebToken Generation
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Generating and Send the JsonWebToken
      jwt.sign(
        payload,
        config.get("jwtToken"),
        { expiresIn: "5 days" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

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
