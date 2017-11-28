const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  balance: { type: Number, default: 1000 }
});
mongoose.model("users", userSchema);
