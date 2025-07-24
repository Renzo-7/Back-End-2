import UserDAO from "./dao/daos/user.dao.js";

const userDAO = new UserDAO();

export default class UserRepository {
  async getUserById(id) {
    return await userDAO.getById(id);
  }

  async getUserByEmail(email) {
    return await userDAO.getByEmail(email);
  }

  async createUser(userData) {
    return await userDAO.create(userData);
  }

  async getAllUsers() {
    return await userDAO.getAll();
  }

  async updateUser(email, updatedData) {
    return await userDAO.updateUser(email, updatedData);
  }
}
