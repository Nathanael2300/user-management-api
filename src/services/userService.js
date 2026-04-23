import userModel from "../models/userModel.js";
import AppError from "../utils/AppError.js";

class UserService {
  async getAllUsers() {
    return await userModel.getAll();
  }

  async getUserById(rawId) {
    const id = Number(rawId);

    if (isNaN(id)) {
      throw new AppError("Invalid ID", 400);
    }

    const user = await userModel.getById(id);

    if (!user) {
      throw new AppError("User not fould", 404);
    }

    return user;
  }

  async createUser(userData) {
    const { email, username } = userData;

    const emailExists = userModel.users.find((u) => u.email === email);
    const usernameExists = userModel.users.find((u) => u.username === username);

    if (emailExists || usernameExists) {
      throw new AppError("User already exist", 409);
    }

    const user = await userModel.create(userData);
    return user;
  }

  async updateUser(rawId, userData) {
    const id = Number(rawId);

    if (isNaN(id)) {
      throw new AppError("Invalid ID", 400);
    }

    const user = await userModel.update(id, userData);

    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  async deleteUser(rawId) {
    const id = Number(rawId);

    if (isNaN(id)) {
      throw new AppError("Invalid ID", 400);
    }

    const user = await userModel.deleteUser(id);

    if (!user) {
      throw new AppError("User not exist", 404);
    }

    return user;
  }
}

export default new UserService();
