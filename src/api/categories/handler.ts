import { Request, Response } from "express";
import {
	CreateCategoryRequestDtoType,
	CreateCategoryRequestDTO,
} from "../../db/dtos/category/index.dto.js";
import { validateZodSchema } from "../../utils/validateZodSchema.js";
import { ZodSchemaError } from "../../errors/index.error.js";
import CategoryService from "../../services/category.service.js";
import { StatusCodes } from "../../utils/constants.js";

export const add = async (
	req: Request<never, never, CreateCategoryRequestDtoType, never>,
	res: Response
) => {
	try {
		const validationResult = validateZodSchema(
			CreateCategoryRequestDTO,
			req.body
		);

		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const categoryService = new CategoryService();
		const category = await categoryService.add(req.body.type);

		res.status(StatusCodes.Created201).send({ category });
		return;
	} catch (error) {
		throw error;
	}
};
