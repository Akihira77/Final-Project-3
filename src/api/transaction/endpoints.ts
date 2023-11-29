import { Router } from "express";
import * as transactionHandler from "./handler.js";
import express, { NextFunction, Request, Response } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

const transactionEndpoint = Router();

transactionEndpoint.get(
	"/admin",
	(
		req: Request<never, never, never, never>,
		res: Response,
		next: NextFunction
	) => authMiddleware(req, res, next, "admin"),
	transactionHandler.findAllTransactionAdmin
);

transactionEndpoint
	.use(authMiddleware)
	.post("", transactionHandler.addTransaction)
	.get("/user", transactionHandler.findAllTransactionUser)
	.get("/:transactionId", transactionHandler.findTransactionById);

export default transactionEndpoint;
