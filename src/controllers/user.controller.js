import UserService from "../services/user.service.js";

const userService = new UserService();

export const getUsers = async (_req, res) => {
  try {
    const users = await userService.getAllUsersService();
    res.json({ status: "success", users });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await userService.getUserByIdService(uid);
    res.json({ status: "success", user });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
};
