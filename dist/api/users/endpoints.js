import express from "express";
import * as userHandler from "./handler.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const userEndpoint = express.Router();
userEndpoint.post("/register", userHandler.register);
userEndpoint.post("/login", userHandler.login);
userEndpoint.put("/:userId", authMiddleware, userHandler.updateUser);
export default userEndpoint;
