import { Router } from "express";
import * as transactionHandler from "./handler.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const transactionEndpoint = Router();
transactionEndpoint.get("/user", transactionHandler.findAllTransactionUser);
transactionEndpoint.get("/admin", (req, res, next) => authMiddleware(req, res, next, "admin"), transactionHandler.findAllTransactionAdmin);
transactionEndpoint.get("/:transactionId", (req, res, next) => authMiddleware(req, res, next, "admin"), transactionHandler.findTransactionById);
transactionEndpoint.post("", transactionHandler.addTransaction);
export default transactionEndpoint;
//# sourceMappingURL=endpoints.js.map