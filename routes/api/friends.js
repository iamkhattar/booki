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
      const friends = await User.findById(userID);
      let user = await User.findById(userID);
      let friendToAdd = await User.findById(friendID);
      let friendsList = user.friends;
      let isFriend = false;

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
          return res.json(friends);
        }
        else {
          return res.status(500).send("Already a friend");
        }

        res.status(200).json({ success: true });
      } else {
        return res.status(500).send("User ID and friend ID is the same");
      }

    } catch (e) {
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