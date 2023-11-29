import { Router } from "express";
import * as productHandler from "./handler.js";
import express, { NextFunction, Request, Response } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

const productEndpoints = Router();

productEndpoints.get("", authMiddleware, productHandler.findAllProduct);

productEndpoints
	.use(
		(
			req: Request<never, never, never, never>,
			res: Response,
			next: NextFunction
		) => authMiddleware(req, res, next, "admin")
	)
	.post("", productHandler.addProduct)
	.put("/:productId", productHandler.updateProduct)
	.patch("/:productId", productHandler.changeCategory)
	.delete("/:productId", productHandler.removeProduct);

export default productEndpoints;
