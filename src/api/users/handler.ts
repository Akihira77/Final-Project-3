import { RegisterRequestDTO } from "./../../db/dtos/users/register.dto.js";
import { Request, Response } from "express";
import { RegisterRequestDtoType } from "../../db/dtos/users/register.dto.js";
import { validateZodSchema } from "../../utils/validateZodSchema.js";
import { ZodSchemaError, CustomAPIError } from "../../errors/index.error.js";
import { hashPassword } from "../../utils/bcrypt.js";
import UserService from "../../services/user.service.js";
import { StatusCodes } from "../../utils/constants.js";

export const register = async (
	req: Request<never, never, RegisterRequestDtoType, never>,
	res: Response
) => {
	try {
		const userService = new UserService();
		const validationResult = validateZodSchema(
			RegisterRequestDTO,
			req.body
		);

		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const newPassword = await hashPassword(req.body.password);
		const result = await userService.register({
			...req.body,
			password: newPassword,
		});
		console.log("clear");

		res.status(StatusCodes.Created201).send(result);
		return;
	} catch (error) {
		throw error;
	}
};
