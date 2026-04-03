// src/models/userModel.js
class UserModel {
  constructor() {
    this.users = [];
  }

  async create(userData) {
    const newId = this.users.length + 1;
    const newUser = { id: newId, ...userData };
    this.users.push(newUser);

    return new Promise((resolve) => setTimeout(() => resolve(newUser), 300));
  }

  getAll() {
    return this.users;
  }

  getById(id) {
    return this.users.find((u) => u.id === id);
  }

  async update(id, updateData) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    this.users[index] = { ...this.users[index], ...updateData };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    const deletedUser = this.users.splice(index, 1);
    return deletedUser[0];
  }
}

module.exports = new UserModel();
