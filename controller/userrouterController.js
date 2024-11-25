const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Token generation function
const createToken = (id) => {
  // Use a secret key securely stored in environment variables
  return jwt.sign({ id }, "ugjhgu876iug", { expiresIn: "1d" });
};

// Login controller
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Log the incoming request body
    console.log("Login request:", req.body);

    // Attempt login using the User model's login method
    const user = await User.login(username, password);

    // Create JWT token
    const token = createToken(user._id);

    // Respond with the username and token
    res.status(200).json({ username, token });
  } catch (err) {
    // Catch any errors during login and respond with an error message
    res.status(400).json({ error: err.message });
  }
};

// Signup controller
const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Log the incoming request body
    console.log("Signup request:", req.body);

    // Attempt signup using the User model's signup method
    const user = await User.signup(username, password);

    // Create JWT token
    const token = createToken(user._id);

    // Respond with the username and token
    res.status(200).json({ username, token });
  } catch (err) {
    // Catch any errors during signup and respond with an error message
    res.status(400).json({ error: err.message });
  }
};

module.exports = { login, signup };
