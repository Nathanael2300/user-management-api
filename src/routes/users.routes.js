import express from "express";
import { router } from "express";
import userController from "../controllers/userControllers.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { validate } from "../middlewares/validate.js";

import {
  getUserSchemaById,
  createUserSchema,
  updateUserSchema,
  userDeleteSchema,
} from "../Schema/userSchema.js";

router.get("/", asyncHandler(userController.getAllUsers));

router.get(
  "/:id",
  validate(getUserSchemaById, "params"),
  asyncHandler(userController.getUserById),
);

router.post(
  "/",
  validate(createUserSchema),
  asyncHandler(userController.createUser),
);

router.put(
  "/:id",
  validate(updateUserSchema),
  asyncHandler(userController.updateUser),
);

router.delete(
  "/:id",
  validate(userDeleteSchema),
  asyncHandler(userController.deleteUser),
);

export default router;
