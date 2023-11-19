import { RegisterRequestDTO } from "./../../db/dtos/users/register.dto.js";
import { Request, Response } from "express";
import { RegisterRequestDtoType } from "../../db/dtos/users/register.dto.js";
import { validateZodSchema } from "../../utils/validateZodSchema.js";
import { ZodSchemaError, CustomAPIError } from "../../errors/index.error.js";
import { hashPassword } from "../../utils/bcrypt.js";
import UserService from "../../services/user.service.js";
import { StatusCodes } from "../../utils/constants.js";
import {
	LoginRequestDTO,
	LoginRequestDtoType,
} from "../../db/dtos/users/login.dto.js";
import {
	UpdateUserRequestDTO,
	UpdateUserRequestDtoType,
} from "../../db/dtos/users/update.dto.js";

export const register = async (
	req: Request<never, never, RegisterRequestDtoType, never>,
	res: Response
) => {
	try {
		const validationResult = validateZodSchema(
			RegisterRequestDTO,
			req.body
		);

		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const userService = new UserService();
		const newPassword = await hashPassword(req.body.password);
		const result = await userService.register({
			...req.body,
			password: newPassword,
		});

		res.status(StatusCodes.Created201).send(result);
		return;
	} catch (error) {
		throw error;
	}
};

export const login = async (
	req: Request<never, never, LoginRequestDtoType, never>,
	res: Response
) => {
	try {
		const validationResult = validateZodSchema(LoginRequestDTO, req.body);
		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const userService = new UserService();
		const result = await userService.login(req.body);

		if (typeof result === "string") {
			throw new CustomAPIError(result, StatusCodes.BadRequest400);
		}

		res.status(StatusCodes.Ok200).send({ token: result.token });
		return;
	} catch (error) {
		throw error;
	}
};

export const updateUser = async (
	req: Request<{ userId: number }, never, UpdateUserRequestDtoType, never>,
	res: Response
) => {
	try {
		if (!req.params.userId) {
			throw new CustomAPIError(
				"User Id must be provided",
				StatusCodes.BadRequest400
			);
		}

		if (Number(req.params.userId) !== req.user.userId) {
			throw new CustomAPIError("Invalid User", StatusCodes.Conflict409);
		}

		const validationResult = validateZodSchema(
			UpdateUserRequestDTO,
			req.body
		);

		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const userService = new UserService();
		const existedUser = await userService.findByUserId(req.params.userId);

		if (!existedUser) {
			throw new CustomAPIError("Invalid User", StatusCodes.NotFound404);
		}

		const updateUser = await userService.updateUser(existedUser, req.body);

		res.status(StatusCodes.Ok200).send(updateUser);
		return;
	} catch (error) {
		throw error;
	}
};
