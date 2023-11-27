import { Router } from "express";
import * as transactionHandler from "./handler.js";
import express, { NextFunction, Request, Response } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

const transactionEndpoint = Router();

transactionEndpoint.get("/user", transactionHandler.findAllTransactionUser)
transactionEndpoint.get("/admin", (
        req: Request<never, never, never, never>,
        res: Response,
        next: NextFunction
    ) => authMiddleware(req, res, next, "admin"), transactionHandler.findAllTransactionAdmin)
transactionEndpoint.get("/:transactionId",(
        req: Request<never, never, never, never>,
        res: Response,
        next: NextFunction
    ) => authMiddleware(req, res, next, "admin"),  transactionHandler.findTransactionById)
transactionEndpoint.post("", transactionHandler.addTransaction);

export default transactionEndpoint;
