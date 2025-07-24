import SessionService from "../services/session.service.js";
import UserDTO from "../dtos/UserDTO.js";

const sessionService = new SessionService();

export const register = async (req, res) => {
  try {
    const newUser = await sessionService.registerUserService(req.body);
    res.status(201).json({ status: "success", payload: newUser });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { token, user } = await sessionService.loginUserService(req.body);
    res.status(200).json({ status: "success", payload: { token, user } });
  } catch (err) {
    res.status(401).json({ status: "error", message: err.message });
  }
};

export const current = (req, res) => {
  const userDTO = new UserDTO(req.user);
  res.json({ status: "success", user: userDTO });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await sessionService.forgotPassword(email);
    res.json({ status: "success", ...result });
  } catch (error) {
    console.error("Error en forgotPasswordController:", error);
    res.status(404).json({ status: "error", message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const result = await sessionService.resetPassword(token, newPassword);
    res.json({ status: "success", message: result });
  } catch (error) {
    console.error("Error en resetPasswordController:", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};
