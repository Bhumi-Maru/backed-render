const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/Auth");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(201) // 201 for resource creation
      .json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("User registration error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, "special", {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("User login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { register, login };
