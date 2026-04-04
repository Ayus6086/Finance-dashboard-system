const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String
  }
}, { timestamps: true });
recordSchema.index({ userId: 1 });
recordSchema.index({ category: 1 });
recordSchema.index({ date: -1 });
module.exports = mongoose.model("Record", recordSchema);