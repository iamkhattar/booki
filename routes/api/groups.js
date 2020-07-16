const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Group = require("../../models/Group");
const User = require("../../models/User");

/**
 * @route   POST /api/groups/create
 * @desc    Create A Group
 * @access  Private
 */
router.post(
  "/create",
  [auth, [check("name", "Please include a group name").not().isEmpty()]],
  async (req, res) => {
    // Request Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extracting Name from Body
    const { name } = req.body;

    // Creating Group
    const group = new Group({ name, admin: req.user.id });
    try {
      //Save the Group
      const user = await User.findById(req.user.id);
      user.groups.unshift({ group: group._id });
      await user.save();
      await group.save();
      return res.json(group);
    } catch (err) {
      return res.status(500).send("Server Error");
    }
  }
);

/**
 * @route   PUT /api/groups/rename
 * @desc    Change Password for a User
 * @access  Private
 */
router.put("/rename",
  [auth,
    [check("groupID", "Please include the group ID").not().isEmpty()],
    [check("name", "Please include a group name").not().isEmpty()]
  ], async(req, res) => {

    // Request Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extracting Name from Body
    const { name } = req.body;
    const { groupID } = req.body;

    try {
      const group = await Group.findById(groupID);
      group.name = name;
      await group.save();
      return res.json(group);
    } catch (err) {
      return res.status(500).send("Server Error");
    }

  });

module.exports = router;
