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
  },
  members: [
    {
      user: mongoose.Schema.Types.ObjectId,
    },
  ],
  messages: [
    {
        type: String,
    }
  ],
  currentBook: {
    book: mongoose.Schema.Types.ObjectId,
    required: true
  },
});

module.exports = Group = mongoose.model("group", GroupSchema);
