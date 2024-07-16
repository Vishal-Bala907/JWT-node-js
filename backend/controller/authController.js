const UserModel = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken"); // Uncomment this line

const test = (req, res) => {
  res.json("test is working");
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username) {
      return res.status(400).json({
        error: "Name required",
      });
    }

    // Check email
    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.status(400).json({
        error: "Email is taken already",
      });
    }

    if (!password || password.length < 4) {
      return res.status(400).json({
        error: "Password required and should be at least 4 chars long",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "User does not exist",
      });
    }

    // Compare passwords
    const match = await comparePassword(password, user.password);

    if (match) {
      jwt.sign(
        { username: user.username, email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) {
            console.error("JWT Sign Error:", err);
            return res.status(500).json({
              error: "Internal server error",
            });
          }
          res.cookie("token", token).json(user);
        }
      );
    } else {
      return res.status(400).json({
        error: "Password did not match",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = { test, registerUser, loginUser, getProfile };
