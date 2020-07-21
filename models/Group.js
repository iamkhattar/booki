const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  members: [
    {
      user: mongoose.Schema.Types.ObjectId,
    },
  ],
  messages: [
    {
      message: {
        type: String,
      },
    },
  ],
  currentBook: {
    book: mongoose.Schema.Types.ObjectId,
  },
  previousBooks: [{
    book: mongoose.Schema.Types.ObjectId,
  }
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Group = mongoose.model("group", GroupSchema);
