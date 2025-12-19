import User from "../models/User.js";
import BankAccount from "../models/BankAccount.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateAccountNumber } from "../utils/accountNumber.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ STORE the created user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // ✅ Now user._id EXISTS
    const accountNumber = generateAccountNumber();

    await BankAccount.create({
      user: user._id,
      accountNumber,
      balance: 0,
    });

    res.status(201).json({
      message: "User registered successfully",
      accountNumber,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; 

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};