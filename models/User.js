const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Fix: Changed `require` to `required`
    unique: true,
  },
  password: {
    type: String,
    required: true, // Fix: Changed `require` to `required`
  },
});

// Static signup method
userSchema.statics.signup = async function (username, password) {
  // Validation
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  // Check if username already exists
  const exist = await this.findOne({ username });
  if (exist) {
    throw Error("Username already in use");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create and save the user
  const user = await this.create({ username, password: hash });

  return user;
};

// Static login method
userSchema.statics.login = async function (username, password) {
  // Validation
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  // Check if the user exists
  const user = await this.findOne({ username });
  if (!user) {
    throw Error("Incorrect username");
  }

  // Compare the provided password with the stored hashed password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User123", userSchema);
