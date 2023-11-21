import express from "express";
import * as userHandler from "./handler.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const userEndpoints = express.Router();
userEndpoints.get("", userHandler.findAll);
userEndpoints.post("/register", userHandler.register);
userEndpoints.post("/login", userHandler.login);
userEndpoints.put("/:userId", authMiddleware, userHandler.updateUser);
userEndpoints.delete("/:userId", authMiddleware, userHandler.deleteUser);
userEndpoints.patch("/topup", authMiddleware, userHandler.topup);
export default userEndpoints;
//# sourceMappingURL=endpoints.js.map