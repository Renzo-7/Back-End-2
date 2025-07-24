import UserRepository from "../repositories/user.repository.js";

const userRepository = new UserRepository();

export default class UserService {
  async getAllUsersService() {
    return await userRepository.getAllUsers();
  }

  async getUserByIdService(id) {
    return await userRepository.getUserById(id);
  }

  async getUserByEmailService(email) {
    return await userRepository.getUserByEmail(email);
  }

  async createUserService(userData) {
    const existingUser = await userRepository.getUserByEmail(userData.email);
    if (existingUser) throw new Error("El usuario ya existe");
    return await userRepository.createUser(userData);
  }
}
