const mongoose = require("mongoose");

const ForumSchema = new mongoose.Schema({
  bookID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  groupID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  active: {
    type: Boolean,
  },
  messages: [
    {
      message: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Forum = mongoose.model("forum", ForumSchema);
