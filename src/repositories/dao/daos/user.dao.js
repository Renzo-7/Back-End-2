import UserModel from "../models/User.js";

export default class UserDAO {
  async getById(id) {
    return await UserModel.findById(id);
  }

  async getByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async create(userData) {
    return await UserModel.create(userData);
  }

  async getAll() {
    return await UserModel.find();
  }

  async updateUser(email, updatedData) {
    return await UserModel.findOneAndUpdate(
      { email },
      { $set: updatedData },
      { new: true }
    );
  }
}
