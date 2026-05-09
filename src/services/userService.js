import userModel from "../models/userModel.js";
import AppError from "../utils/AppError.js";

class UserService {
  async getAllUsers() {
    return await userModel.getAllUsers();
  }

  async getUserById(rawId) {
    const id = Number(rawId);

    if (isNaN(id)) {
      throw new AppError("Invalid ID", 400);
    }

    const user = await userModel.getById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  async createUser(userData) {
    const { email, username } = userData;

    const emailExists = await userModel.findByEmail(email);
    const usernameExists = await userModel.findByUsername(username);

    if (emailExists || usernameExists) {
      throw new AppError("User already exist", 409);
    }

    return await userModel.createUser(userData);
  }

  async updateUser(rawId, userData) {
    const id = Number(rawId);

    if (isNaN(id)) {
      throw new AppError("Invalid ID", 400);
    }

    const { email, username } = userData;

    if (email) {
      const emailExists = userModel.users.find(
        (u) => u.email === email && u.id !== id,
      );

      if (emailExists) {
        throw new AppError("Email already in use", 409);
      }
    }

    if (username) {
      const usernameExist = userModel.users.find(
        (u) => u.username === username && u.id !== id,
      );

      if (usernameExist) {
        throw new AppError("User name already in use", 409);
      }
    }

    const user = await userModel.updateUser(rawId, userData);

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
      throw new AppError("User not found", 404);
    }

    return user;
  }
}

export default new UserService();
