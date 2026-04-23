import userService from "../services/userService.js";
import {
  getUserSchemaById,
  createUserSchema,
  updateUserSchema,
  userDeleteSchema,
} from "../Schema/userSchema.js";

class UserController {
  async getAllUsers(req, res) {
    const users = await userService.getAllUsers();

    return res.status(200).json({
      user_total: users.length,
      users,
    });
  }

  async getUserById(req, res) {
    const { id } = getUserSchemaById.parse(req.params);
    const user = await userService.getUserById(id);
    return res.status(200).json({ user: user });
  }

  async createUser(req, res) {
    const data = createUserSchema.parse(req.body);
    const user = await userService.createUser(data);
    return res.status(201).json({
      message: "User created successfully",
      user: user,
    });
  }

  async updateUser(req, res) {
    const { id } = getUserSchemaById.parse(req.params);
    const data = updateUserSchema.parse(userData);
    const user = await userService.updateUser(id, data);
    return res.status(200).json({
      message: "User updated successfully",
      user: user,
    });
  }

  async deleteUser(req, res) {
    const { id } = userDeleteSchema.parse(req.params);
    await userService.deleteUser(id);
    return res.status(204).send();
  }
}

export default new UserController();
