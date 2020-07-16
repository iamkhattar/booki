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
 * @route   DELETE api/group/:id
 * @desc    Delete A Group
 * @access  Private
 */

router.delete(
  '/:id', 
  auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) throw Error('No groups found');

    const removed = await group.remove();
    if (!removed)
      throw Error('Something went wrong while trying to delete this group');

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});


module.exports = router;
