const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("todos", TodoSchema);
