import { NextFunction, Request, Response } from "express";
import { CustomAPIError } from "../../errors/index.error.js";
import { StatusCodes } from "../../utils/constants.js";
import { jwtVerify } from "../../utils/jwt.js";

const authMiddleware = (
	req: Request<never, never, never, never>,
	res: Response,
	next: NextFunction,
	rolePermitted: "admin" | "customer" | undefined = undefined
) => {
	try {
		const token = req.headers.token;

		if (!token || token === "" || Array.isArray(token)) {
			throw new CustomAPIError(
				"Authentication Failed",
				StatusCodes.Forbidden403
			);
		}

		const payload = jwtVerify(token);
		if (rolePermitted) {
			if (payload.user.role !== rolePermitted) {
				throw new CustomAPIError(
					"Invalid Credentials",
					StatusCodes.Forbidden403
				);
			}
		}
		// console.log(payload);
		req.user = payload.user;

		next();
	} catch (error) {
		throw error;
	}
};

export default authMiddleware;
