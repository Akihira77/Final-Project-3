import express, { NextFunction, Request, Response } from "express";
import * as categoryHandler from "./handler.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const categoryEndpoints = express.Router();

categoryEndpoints
	.use(
		(
			req: Request<never, never, never, never>,
			res: Response,
			next: NextFunction
		) => authMiddleware(req, res, next, "admin")
	)
	.get("", categoryHandler.findAll)
	.post("", categoryHandler.add)
	.patch("/:categoryId", categoryHandler.edit)
	.delete("/:categoryId", categoryHandler.remove);

// categoryEndpoints.post("", categoryHandler.add);
// categoryEndpoints.patch("/:categoryId", categoryHandler.edit);
// categoryEndpoints.delete("/:categoryId", categoryHandler.remove);

export default categoryEndpoints;
