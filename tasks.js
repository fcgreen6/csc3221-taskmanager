const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "must provide a task name"],
      maxlength: [500, "name can not be more than 500 characters"]
    },
    completed: {
      type: Boolean,
      default: false
    },
    clientIndex: {
        type: Number,
        required: [true, "must provide an index number"]
    }
});

module.exports = mongoose.model("tasks", taskSchema);