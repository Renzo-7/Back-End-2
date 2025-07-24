import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const signToken = (payload, expires = "2h") =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: expires });

export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

export const passwordResetToken = (email) => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyPasswordResetToken = (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded.email;
};
