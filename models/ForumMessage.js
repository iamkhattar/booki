const mongoose = require("mongoose");

const ForumMessageSchema = new mongoose.Schema({
  message: {
    type: string,
  },
  replies: [
    {
      message: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  date: {
    type: date,
    default: Date.now(),
  },
});

module.exports = ForumMessageSchema = mongoose.model(
  "forumMessage",
  ForumMessageSchema
);
