import express from "express";
import * as userHandler from "./handler.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userEndpoints = express.Router();

userEndpoints.post("/register", userHandler.register);
userEndpoints.post("/login", userHandler.login);
userEndpoints.put("/:userId", authMiddleware, userHandler.updateUser);

export default userEndpoints;
