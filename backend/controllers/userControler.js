const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

// User registration
const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    let { email, password, name } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        return res.status(500).json({ success: false, message: "Server error" });
      }
      
      const newUser = await userModel.create({ 
        name, 
        email, 
        password: hash 
      });
      
      return res.status(201).json({ 
        success: true, 
        message: "Registration successful",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      });
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: "Registration failed" });
  }
};

// User login
const login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not registered" });
    }

    let hash = user.password;
    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        return res.status(500).json({ success: false, message: "Invalid credentials" });
      }
      if (result === true) {
        let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
        return res.status(200).json({
          success: true,
          message: "Login successful",
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role || "User",
          },
        });
      } else {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    });

  } catch (err) {
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

module.exports = {
  register,
  login
};