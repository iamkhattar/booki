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
  [auth,
    [check("name", "Please include a group name").not().isEmpty()]
  ], async (req, res) => {
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
 * @desc    rename a group
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
      let validGroup = groupValidation(groupID)
      if (!validGroup) {
        return res.status(500).send("invalid group");
      }
      let adminID = group.admin;
      let currentUser = req.user.id;

      if (currentUser != adminID) {
        return res.status(500).send("User does not have permission");
      } else

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
  [auth
  ],
  async (req, res) => {
    try {
      // Request Validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let groupID = req.params.id;
      let validGroup = groupValidation(groupID)
      if (!validGroup) {
        return res.status(500).send("invalid group");
      }
      let group = await Group.findById(groupID);
      let adminID = group.admin;
      let currentUser = req.user.id;

      if (currentUser != adminID) {
        return res.status(401).send("User does not have permission");
      } else {

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
      }
    } catch (e) {
      res.status(400).json({ msg: e.message, success: false });
    }
  });


/**
* @route   PUT api/group/leave
* @desc    Remove user from group
* @access  Private
*/

router.put("/leave",
  [auth,
    [check("groupID", "Please include the group ID").not().isEmpty()]
  ], async (req, res) => {
    // Request Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { groupID } = req.body;
      let validGroup = groupValidation(groupID)
      if (!validGroup) {
        return res.status(500).send("invalid group");
      }
      let group = await Group.findById(groupID);
      const user = await User.findById(req.user.id);

      if (!group) {
        return res.status(400).send("Not a valid group");
      }
      let memberList = group.members;

      if (!user) {
        return res.status(400).send("Not a valid user");
      }
      let groupList = user.groups;

      let member = false;

      for (let i = 0; i < groupList.length; i++) {
        if (groupList[i].group == groupID) {
          groupList.splice(i, 1);
          member = true;
          await user.save();
        }
      }
      if (!member) {
        return res.status(401).send("User is not a member of this group");
      }
      for (let i = 0; i < memberList.length; i++) {
        if (memberList[i].user == req.user.id) {
          memberList.splice(i, 1);
          await group.save();
        }
      }
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(400).json({ msg: e.message, success: false });
    }
  });

/**
* @route   PUT api/group/remove
* @desc    Remove user from group
* @access  Private
*/

router.put("/remove",
  [auth,
    [check("groupID", "Please include the group ID").not().isEmpty()],
    [check("userID", "Please include the user ID").not().isEmpty()]
  ], async (req, res) => {

    // Request Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { groupID } = req.body;
      const { userID } = req.body;

      let validGroup = groupValidation(groupID)
      if (!validGroup) {
        return res.status(500).send("invalid group");
      }
      const group = await Group.findById(groupID);
      const user = await User.findById(userID);
      let admin = false;

      let currentUser = req.user.id;
      if (!group) {
        return res.status(500).send("Not a valid group");
      }

      if (!(currentUser == group.admin)) {
        return res.status(401).send("not authorised");
      }
      let memberList = group.members;

      if (!user) {
        return res.status(500).send("Not a valid user");
      }
      let groupList = user.groups;

      let member = false;

      for (let i = 0; i < groupList.length; i++) {
        if (groupList[i].group == groupID) {
          groupList.splice(i, 1);
          member = true;
          await user.save();
        }
      }
      if (!member) {
        return res.status(500).send("User is not a member of this group");
      }

      for (let i = 0; i < memberList.length; i++) {
        if (memberList[i].user == userID) {
          memberList.splice(i, 1);
          await group.save();
        }
      }
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
  [auth,
    [check("groupID", "Please include the group ID").not().isEmpty()],
    [check("userID", "Please include the user ID").not().isEmpty()]
  ], async (req, res) => {
    // Request Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { userID } = req.body;
      const { groupID } = req.body;
      let validGroup = groupValidation(groupID)
      if (!validGroup) {
        return res.status(500).send("invalid group");
      }

      const group = await Group.findById(groupID);
      let user = await User.findById(userID);
      let groupList = user.groups;
      let member = false;
      // only a current member should be able to add more members
      let currentUser = req.user.id;
      let authorised = false;

      for (let i = 0; i < group.members.length; i++) {
        if (group.members[i].user == currentUser) {
          authorised = true;
        }
      }
      if (!authorised) {
        return res.status(401).send("User not authorised to add members to this group");
      }
      for (let i = 0; i < groupList.length; i++) {
        if (groupList[i].group == groupID) {
          member = true;
        }
      }
      if (member) {
        return res.status(500).send("Already a member");
      }
      user.groups.unshift({ group: group._id });
      group.members.unshift({ user: user._id });
      await user.save();
      await group.save();
      return res.json(group);

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

/**
* @route   GET api/groups/fetch
* @desc    Get a users Groups
* @access  Private
*/

router.get(
  '/fetch', auth,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      let groups = user.groups;

      res.status(200).json(groups);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });


/**
* @route   POST /api/groups/book
* @desc    get the current book
* @access  Private
*/
router.post('/book',
  [auth,
    [check("groupID", "Please include the group ID").not().isEmpty()]
  ], async (req, res) => {

    // Request Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { groupID } = req.body;
      const userID = req.user.id;

      let validGroup = groupValidation(groupID)
      if (!validGroup) {
        return res.status(500).send("invalid group");
      }
      const group = await Group.findById(groupID);

      let member = userChecking(group, userID);
      if (member) {
        if (group.currentBook == '{}') {
          return res.status(500).send("No current book");
        }
        else {
          return res.status(200).send(group.currentBook);
        }
      } else {
        return res.status(500).send("not a member");
      }

    } catch{
      return res.status(500).send("server error");
    }
  }
);

/**
* @route   POST /api/groups/previousBooks
* @desc    get the current book
* @access  Private
*/
router.post('/previousBooks',
  [auth,
    [check("groupID", "Please include the group ID").not().isEmpty()]
  ], async (req, res) => {
    // Request Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { groupID } = req.body;
      const userID = req.user.id;

      let validGroup = groupValidation(groupID)
      if (!validGroup) {
        return res.status(500).send("invalid group");
      }

      const group = await Group.findById(groupID);

      let member = userChecking(group, userID);
      if (member) {
        if (group.previousBooks == '{}') {
          return res.status(500).send("No previous book");
        }
        else {
          return res.status(200).send(group.previousBooks);
        }
      } else {
        return res.status(401).send("not a member");
      }

    } catch{
      return res.status(500).send("server error");
    }
  }
);

/**
* @route   PUT /api/groups/book
* @desc    set the current book
* @access  Private
*/
router.put('/book',
  [auth,
    [check("groupID", "Please include the group ID").not().isEmpty()],
    [check("bookID", "Please include the book ID").not().isEmpty()]
  ], async (req, res) => {

    // Request Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let userID = req.user.id;
    const { groupID } = req.body;
    const { bookID } = req.body;

    let validGroup = groupValidation(groupID)
    if (!validGroup) {
      return res.status(500).send("invalid group");
    }

    const group = await Group.findById(groupID);

    // check group is real
    if (!group) {
      return res.status(500).send("server error");
    }

    let member = userChecking(group, userID);
    if (member) {

      try {
        // find the book
        let book = await Book.findById(bookID);
        group.currentBook = { book: book._id };

        await group.save();
        return res.json(group);
      }
      catch{
        return res.status(500).send("server error");
      }
    }
    else {
      return res.status(500).send("user not authorised")
    }
  }
);

/**
* @route   PUT /api/groups/previousBook
* @desc    add a previous book
* @access  Private
*/

// should you be able to read the same book twice?
router.put('/previousBook',
  [auth,
    [check("groupID", "Please include the group ID").not().isEmpty()],
    [check("bookID", "Please include the book ID").not().isEmpty()]
  ], async (req, res) => {

    // Request Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let userID = req.user.id;
    const { groupID } = req.body;
    const { bookID } = req.body;

    let validGroup = groupValidation(groupID)
    if (!validGroup) {
      return res.status(500).send("invalid group");
    }
    const group = await Group.findById(groupID);

    let member = userChecking(group, userID);
    if (member) {
      try {
        // find the book
        let book = await Book.findById(bookID);
        group.previousBooks.unshift({ book: book._id });

        await group.save();
        return res.json(group);
      }
      catch{
        return res.status(500).send("server error");
      }
    }
    else {
      return res.status(500).send("user not authorised")
    }
  }
);

let userChecking = function (group, userID) {
  let groupMembers = group.members;
  let member = false;

  // only member can change a book groups book
  for (let i = 0; i < groupMembers.length; i++) {
    if (groupMembers[i].user == userID) {
      member = true;
    }
  }
  return member;
}

let groupValidation = async function (groupID) {
  try {
    const group = await Group.findById(groupID);
    return true;
  }
  catch{
    return false;
  }
}

module.exports = router;
