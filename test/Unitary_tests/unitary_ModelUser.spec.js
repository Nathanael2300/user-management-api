import { expect } from "chai";
import userModel from "../../src/models/userModel.js";
import userFactory from "../../test/factories/factories_userModel.js";
import mockUsers from "../../src/data/usersMock.js";

describe("User Model", () => {
  describe("Scenarios postive", () => {
    beforeEach(() => {
      userModel.users = [...mockUsers];
    });
    describe("get_All()", () => {
      it("Should returl all users successfully", async () => {
        const users = await userModel.getAll();
        expect(users).to.be.an("array");
        expect(users.length).to.equal(mockUsers.length);
        expect(users[0]).to.deep.eql(mockUsers[0]);
      });
    });

    describe("getById()", () => {
      it("Should return a user by ID successfully", async () => {
        const user = await userModel.getById(1);
        expect(user).to.be.an("object");
        expect(user).to.have.property("id");
        expect(user.id).to.eql(1);
        expect(user).to.include(mockUsers[0]);
      });
    });

    describe("create()", () => {
      it("Should create a user successfully", async () => {
        const userData = userFactory();
        const newUser = await userModel.create(userData);
        expect(newUser).to.be.an("object");
        expect(newUser).to.have.property("id");
        expect(newUser).to.include(userData);
      });
    });

    describe("update()", () => {
      it("Should update a user data successfully", async () => {
        const user = await userModel.getById(1);
        expect(user).to.be.an("object");
        expect(user).to.have.property("id");
        expect(user.id).to.eql(1);
        expect(user).to.include(mockUsers[0]);
        expect(user.username).to.deep.eql("nathan2300");
        expect(user.nickname).to.deep.eql("nathanGamer");

        const userData = userFactory();
        const updateUser = await userModel.update(1, {
          username: userData.username,
          nickname: userData.nickname,
        });

        expect(updateUser).to.be.an("object");
        expect(updateUser).to.have.property("id");
        expect(updateUser.id).to.eql(1);
        expect(updateUser.username).to.deep.eql(userData.username);
        expect(updateUser.nickname).to.deep.eql(userData.nickname);
      });
    });

    describe("delete()", () => {
      it("Should delete a user successfully", async () => {
        const deletedUser = await userModel.delete(1);
        expect(deletedUser).to.be.an("object");
        expect(deletedUser.username).to.deep.eql("nathan2300");
        expect(deletedUser.nickname).to.deep.eql("nathanGamer");
      });
    });
  });
});
