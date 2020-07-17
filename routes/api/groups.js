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
      group.members.unshift({ user: user._id });
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
  ], async (req, res) => {

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

/**
* @route   DELETE api/group/:id
* @desc    Delete A Group
* @access  Private
*/

router.delete(
  '/:id',
  auth, async (req, res) => {
    try {
      let groupID = req.params.id;
      const group = await Group.findById(groupID);

      // remove the group for all members
      let memberList = group.members;
      for (let i = 0; i < memberList.length; i++) {
        let user = await User.findById(group.members[i].user);
        let groupList = user.groups;
        for (let j = 0; j < groupList.length; j++) {
          if (groupList[j].group == groupID) {
            groupList.splice(j, 1);
            await user.save();
          }
        }
      }

      if (!group) throw Error('No groups found');
      const removed = await group.remove();
      if (!removed)
        throw Error('Something went wrong while trying to delete this group');

      res.status(200).json({ success: true });
    } catch (e) {
      res.status(400).json({ msg: e.message, success: false });
    }
  });

/**
* @route   PUT api/group/addMember
* @desc    Add a user to a group
* @access  Private
*/

router.put("/addMember",
  auth, async (req, res) => {
    try {
      const { userID } = req.body;
      const { groupID } = req.body;
      const group = await Group.findById(groupID);
      let user = await User.findById(userID);
      let groupList = user.groups;
      let member = false;

      for (let i = 0; i < groupList.length; i++) {
        if (groupList[i].group == groupID) {
          member = true;
        }
      }

      if (!member) {
        // add to group
        user.groups.unshift({ group: group._id });
        group.members.unshift({ user: user._id });
        await user.save();
        await group.save();
        return res.json(group);
      }
      else {
        return res.status(500).send("Already a member");
      }

      res.status(200).json({ success: true });
    } catch (e) {
      res.status(400).json({ msg: e.message, success: false });
    }
  });

/**
 * @route   GET api/groups
 * @desc    Get All Groups
 * @access  Public
 */

router.get(
  '/',
  async (req, res) => {
    try {
      const group = await Group.find();
      if (!group) throw Error('No groups');

      res.status(200).json(group);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });

module.exports = router;
