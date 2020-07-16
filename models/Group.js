const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  members: [
    {
      user: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
  ],
  messages: [
    {
        type: String,
    }
  ],
  currentBook: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Group = mongoose.model("group", GroupSchema);
