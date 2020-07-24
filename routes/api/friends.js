const express = require("express");

const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

const router = express.Router();

/**
* @route   PUT /api/user/friends/addFriend
* @desc    Add a Friend for a User
* @access  Private
*/

router.put("/addFriend",
  [auth,
    [check("userID", "Please include the user's ID").not().isEmpty()],
    [check("friendID", "Please include the ID of the friend you wish to add").not().isEmpty()]
  ], async (req, res) => {
    // Request Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { userID } = req.body;
      const { friendID } = req.body;
      let user = await User.findById(userID);
      let friendToAdd = await User.findById(friendID);
      let friendsList = user.friends;
      let isFriend = false;

      // loop through users friend list to check if already a friend
      if (userID != friendID) {
        for (let i = 0; i < friendsList.length; i++) {
          if (friendsList[i].user == friendID) {
            isFriend = true;
          }
        }

        if (!isFriend) {
          // add friend
          user.friends.unshift({ user: friendToAdd._id });
          await user.save();
          return res.json(user.friends);
        }
        else {
          return res.status(401).send("Already a friend");
        }
        res.status(200).json({ success: true });
      } else {
        return res.status(404).send("User ID and friend ID is the same");
      }
    } catch (e) {
      return res.status(500).send("Server Error");
    }
  });


/**
 * @route   Put /api/user/friends/removeFriend
 * @desc    Remove Friend from User
 * @access  Private
 */

router.put("/removeFriend",
[auth,
  [ [check("userID", "Please include the user's ID").not().isEmpty()],
  check("friendID", "Please include the ID of the friend you wish to remove").not().isEmpty()]
], async (req, res) => {

  // Request Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { friendID } = req.body;
    const { userID } = req.body;
    const user = await User.findById(userID);
    let friendsList = user.friends;
    let isFriend = false;

    for (let i = 0; i < friendsList.length; i++) {
      if (friendsList[i].user == friendID) {
        friendsList.splice(i, 1);
        isFriend = true;
        await user.save();
        return res.json(user.friends);
      }
    }
    if (!isFriend) {
      return res.status(401).send("User is not a friend");
    }
    if (userID == friendID) {
      return res.status(404).send("User ID and friend ID is the same");
    }
    res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).send("Server Error");
  }
});

module.exports = router;