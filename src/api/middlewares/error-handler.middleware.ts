import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../../utils/constants.js";
import { ValidationError } from "sequelize";
import validationSequelizeSchema from "../../utils/validationSequelizeSchema.js";
import { CustomAPIError, ZodSchemaError } from "../../errors/index.error.js";

export const ErrorHandlerMiddleware = (
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log("Catching error from error handler middleware => ", err);
	if (err instanceof ValidationError) {
		res.status(StatusCodes.BadRequest400).send({
			errors: validationSequelizeSchema(err),
		});
		return;
	} else if (err instanceof ZodSchemaError) {
		res.status(err.statusCode).send({ name: err.name, errors: err.errors });
		return;
	}
	res.status(StatusCodes.InternalServerError500).send({ err });
	return;
};
