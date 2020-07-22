const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

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

      // Generate and Send the JsonWebToken
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
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    // Request Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extracting Parameters from Request Body
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // Check if user is registered with the request email
      if (!user) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Check if password matches database
      const isMatch = await bcrypt.compare(password, user.password);

      // If password is not a match send appropriate error
      if (!isMatch) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Prepare the Payload for JsonWebToken Generation
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Generate and Send the JsonWebToken
      jwt.sign(
        payload,
        config.get("jwtToken"),
        { expiresIn: "5 days" },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   GET /api/user/
 * @desc    Get a Users Details
 * @access  Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   PUT /api/user/password
 * @desc    Change Password for a User
 * @access  Private
 */
router.put(
  "/password",
  [
    auth,
    [
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 }),
    ],
  ],
  async (req, res) => {
    // Request Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;

    try {
      // Find User in DB
      const user = await User.findById(req.user.id);

      // Change User Password
      user.password = password;

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

      // Generate and Send the JsonWebToken
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
      return res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   POST /api/user/password
 * @desc    Forget Password for a User
 * @access  Public
 */
router.post("/password", (req, res) => {
  res.send("Endpoint to Forget Password");
});

module.exports = router;
