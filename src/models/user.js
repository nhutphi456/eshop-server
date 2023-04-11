const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: () => (this.provider !== "email" ? true : false),
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String },
  provider: {
    type: String,
    required: true,
    default: "email",
  },
  googleId: String,
  avatar: String,
  createdDate: { type: Date, default: Date.now() },
  updatedDate: Date,
});

module.exports = mongoose.model("User", userSchema);
