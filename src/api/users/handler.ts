import { Request, Response } from "express";
import { validateZodSchema } from "../../utils/validateZodSchema.js";
import { ZodSchemaError, CustomAPIError } from "../../errors/index.error.js";
import { hashPassword } from "../../utils/bcrypt.js";
import UserService from "../../services/user.service.js";
import { StatusCodes } from "../../utils/constants.js";
import {
	LoginRequestDTO,
	LoginRequestDtoType,
	RegisterRequestDTO,
	RegisterRequestDtoType,
	TopupRequestDTO,
	TopupRequestDtoType,
	UpdateUserRequestDTO,
	UpdateUserRequestDtoType,
} from "../../db/dtos/users/index.dto.js";

const userService = new UserService();

export const findAll = async (req: Request, res: Response) => {
	try {
		const users = await userService.findAll();

		res.status(StatusCodes.Ok200).send({ users });
		return;
	} catch (error) {
		throw error;
	}
};

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

		// const newPassword = await hashPassword(req.body.password);
		const result = await userService.register(req.body);

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
	req: Request<never, never, UpdateUserRequestDtoType, never>,
	res: Response
) => {
	try {
		const validationResult = validateZodSchema(
			UpdateUserRequestDTO,
			req.body
		);

		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const existedUser = await userService.findByUserId(req.user.userId);

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

export const deleteUser = async (
	req: Request<never, never, never, never>,
	res: Response
) => {
	try {
		const existedUser = await userService.findByUserId(req.user.userId);

		if (!existedUser) {
			throw new CustomAPIError("Invalid User", StatusCodes.NotFound404);
		}

		const affectedUser = await userService.deleteUser(req.user.userId);

		if (!affectedUser) {
			throw new CustomAPIError(
				"Deleting Failed. Please try again!",
				StatusCodes.BadRequest400
			);
		}

		res.status(StatusCodes.Ok200).send({
			message: "Your account has been successfully deleted",
		});
		return;
	} catch (error) {
		throw error;
	}
};

export const topup = async (
	req: Request<never, never, TopupRequestDtoType, never>,
	res: Response
) => {
	try {
		const validationResult = validateZodSchema(TopupRequestDTO, req.body);
		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const result = await userService.topup(
			req.body.balance,
			req.user.userId
		);

		if (typeof result === "string") {
			throw new CustomAPIError(result, StatusCodes.BadRequest400);
		}

		res.status(StatusCodes.Ok200).send({
			message: `Your balance has been successfully updated to Rp ${result}`,
		});
		return;
	} catch (error) {
		throw error;
	}
};
