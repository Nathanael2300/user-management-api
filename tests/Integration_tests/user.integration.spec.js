import { expect } from "chai";
import userApi from "../helpers/userApi.js";
import userFactory from "../factories/user.factory.js";

describe("User Integration Tests", () => {
  describe("/GET", () => {
    describe("Positive Scenarios", () => {
      it("Should return all user list", async () => {
        const resGetAll = await userApi.getAll();

        expect(resGetAll.status).to.eql(200);
        expect(resGetAll.body).to.have.property("user_total");
        const fields = [
          "id",
          "email",
          "password",
          "username",
          "nickname",
          "profilePicture",
          "bio",
          "phoneNumber",
          "address",
          "website",
          "socialLinks",
        ];
        const valueTypes = {
          id: "number",
          email: "string",
          password: "string",
          username: "string",
          nickname: "string",
          profilePicture: "string",
          bio: "string",
          phoneNumber: "string",
          address: "object",
          website: "string",
          socialLinks: "array",
        };

        for (const user of resGetAll.body.users) {
          fields.forEach((field) => {
            expect(user).have.property(field);
          });
        }

        for (const user of resGetAll.body.users) {
          for (const [key, type] of Object.entries(valueTypes)) {
            expect(user[key]).to.be.an(type);
          }
        }
      });
    });

    describe("Negative Scenarios", () => {});
  });

  describe("/GET/:id", () => {
    describe("Scenarios positive", () => {
      it("Should return a user list", async () => {
        const createUser = userFactory();
        const resCreate = await userApi.create(createUser);
        expect(resCreate.status).to.eql(201);

        const id = resCreate.body.user.id;

        const resGetById = await userApi.getById(id);

        expect(resGetById.status).to.eql(200);
        const fields = [
          "id",
          "email",
          "password",
          "username",
          "nickname",
          "profilePicture",
          "bio",
          "phoneNumber",
          "address",
          "website",
          "socialLinks",
        ];
        const valueTypes = {
          id: "number",
          email: "string",
          password: "string",
          username: "string",
          nickname: "string",
          profilePicture: "string",
          bio: "string",
          phoneNumber: "string",
          address: "object",
          website: "string",
          socialLinks: "array",
        };
        for (const key of fields) {
          expect(resGetById.body.user).to.have.property(key);
        }

        for (const [key, value] of Object.entries(valueTypes)) {
          expect(resGetById.body.user[key]).to.be.an(value);
        }
      });
    });
    describe("Scenarios negative ", () => {});
  });

  describe.only("/POST", () => {
    describe("Scenarios positive", () => {
      it("Should create user successfully", async () => {
        const createUser = userFactory();
        const resCreate = await userApi.create(createUser);
        expect(resCreate.status).to.eql(201);
      });
    });
    describe("Scenarios negative", () => {});
  });
});
