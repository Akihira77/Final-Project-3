import { Router } from "express";
import * as transactionHandler from "./handler.js";

const transactionEndpoint = Router();

transactionEndpoint.get("/user", transactionHandler.findAllTransactionUser)
transactionEndpoint.get("/admin", transactionHandler.findAllTransactionAdmin)
transactionEndpoint.get("/:transactionId", transactionHandler.findTransactionById)
transactionEndpoint.post("", transactionHandler.addTransaction);

export default transactionEndpoint;
