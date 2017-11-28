const mongoose = require("mongoose");

const { Schema } = mongoose;

const receiptSchema = new Schema({
  to: String,
  from: String,
  amount: Number,
  timestamp: Date
});
mongoose.model("receipts", receiptSchema);
