import { expect } from "chai";
import sinon from "sinon";
import { faker } from "@faker-js/faker";

import userService from "../../src/services/userService.js";
import userModel from "../../src/models/userModel.js";
import mockUsers from "../../src/data/usersMock.js";

describe("User Service", () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe("getAllUsers()", () => {
    describe("Positive Scenarios", () => {
      it("Should return all users list", async () => {
        sinon.stub(userModel, "getAllUsers").resolves(mockUsers);

        const users = await userService.getAllUsers();

        expect(users).to.be.an("array");
        users.forEach((user) => {
          expect(user).to.be.an("object");
          expect(user).to.be.an("object");
          expect(user).to.have.property("id");
          expect(user).to.have.property("email");
          expect(user).to.have.property("username");
          expect(user).to.have.property("nickname");
        });
      });
    });

    describe("Negative Scenarios", () => {
      beforeEach(() => {
        userModel.users = [];
      });
      it("Shoult not return users list", async () => {
        sinon.stub(userModel, "getAllUsers").resolves(mockUsers);

        const users = await userService.getAllUsers();

        expect(users).to.be.an("array");
        expect(users).to.have.lengthOf(0);
      });
    });
  });

  describe("getById()", () => {
    describe("Positive Scenarios", () => {
      it("Should return a user by id", async () => {
        sinon.stub(userModel, "getById").resolves(mockUsers);

        const user = await userService.getUserById(1);

        expect(user).to.be.an("object");
        user.forEach((userById) => {
          expect(userById).to.be.an("object");
          expect(userById).to.be.an("object");
          expect(userById).to.have.property("id");
          expect(userById).to.have.property("email");
          expect(userById).to.have.property("username");
          expect(userById).to.have.property("nickname");
        });
      });
    });
    describe("Negative Scenarios", () => {
      it("Should return a error when the user not exist", async () => {
        sinon.stub(userModel, "getById").resolves(mockUsers);
        const number = faker.number.int({ min: 30000 });

        const user = await userService.getUserById(number);

        expect(user);
      });
    });
  });
});
