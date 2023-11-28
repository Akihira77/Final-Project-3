import { Router } from "express";
import * as productHandler from "./handler.js";
import express, { NextFunction, Request, Response } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

const productEndpoints = Router();

productEndpoints.use(authMiddleware).get("", productHandler.findAllProduct);

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
	.patch("/:productId", productHandler.patchProduct)
	.delete("/:productId", productHandler.removeProduct);

// productEndpoints.post("", (
//             req: Request<never, never, never, never>,
//             res: Response,
//             next: NextFunction
//         ) => authMiddleware(req, res, next, "admin"), productHandler.addProduct);
// productEndpoints.put("/:productId",(
//             req: Request<never, never, never, never>,
//             res: Response,
//             next: NextFunction
//         ) => authMiddleware(req, res, next, "admin"), productHandler.updateProduct);
// productEndpoints.patch("/:productId",(
//             req: Request<never, never, never, never>,
//             res: Response,
//             next: NextFunction
//         ) => authMiddleware(req, res, next, "admin"), productHandler.patchProduct);
// productEndpoints.delete("/:productId",(
//             req: Request<never, never, never, never>,
//             res: Response,
//             next: NextFunction
//         ) => authMiddleware(req, res, next, "admin"), productHandler.removeProduct);

export default productEndpoints;
