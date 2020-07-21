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
  auth, async (req, res) => {
    try {
      const { userID } = req.body;
      const { friendID } = req.body;
      
      const friends = await User.findById(userID);
      let user = await User.findById(userID);
      let friendToAdd = await User.findById(friendID);

      let isFriend = false;

      if (userID != friendID) {
        for (let i = 0; i < friends.length; i++) {
          if (friends[i].user == friendID) {
            isFriend = true;
          } 
        }

        if (!isFriend) {
          // add friend
          user.friends.unshift({ user: friendToAdd._id });
          await user.save();
          return res.json(friends);
        } else {
          return res.status(500).send("Already a friend");
        }
      } else {
        return res.status(600).send("UserID is the same as the FriendID you wish to add")
      }

        res.status(200).json({ success: true });
      } 
      
     catch (e) {
      res.status(400).json({ msg: e.message, success: false });
    }
  });


/**
 * @route   POST /api/user/friends/remove
 * @desc    Remove Friend from User
 * @access  Private
 */
router.post("/remove", (req, res) => {
  res.send("Remove Friend from User");
});

module.exports = router;
