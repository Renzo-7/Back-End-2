import User from "../models/User.js";
import Cart from "../models/Cart.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { signToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const { first_name, last_name, age, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already used" });

    const hashed = await hashPassword(password);

    const cart = await Cart.create({ products: [] });

    const user = await User.create({
      first_name,
      last_name,
      age,
      email,
      password: hashed,
      role,
      cart: cart._id,
    });

    res.status(201).json({ user });
  } catch (err) {
    console.error("Error en registro:", err);
    res.status(500).json({ message: "Register error", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await comparePassword(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken({ id: user._id, role: user.role });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login error", err });
  }
};
