import { Request, Response } from "express";
import {
	CreateCategoryRequestDtoType,
	CreateCategoryRequestDTO,
	EditCategoryRequestDtoType,
	EditCategoryRequestDTO,
} from "../../db/dtos/category/index.dto.js";
import { validateZodSchema } from "../../utils/validateZodSchema.js";
import { CustomAPIError, ZodSchemaError } from "../../errors/index.error.js";
import CategoryService from "../../services/category.service.js";
import { StatusCodes } from "../../utils/constants.js";

export const findAll = async (
	req: Request<never, never, never, never>,
	res: Response
) => {
	try {
		const categoryService = new CategoryService();
		const categories = await categoryService.findAll();

		res.status(StatusCodes.Ok200).send({ categories });
		return;
	} catch (error) {
		throw error;
	}
};

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

export const edit = async (
	req: Request<
		{ categoryId: number },
		never,
		EditCategoryRequestDtoType,
		never
	>,
	res: Response
) => {
	try {
		const validationResult = validateZodSchema(
			EditCategoryRequestDTO,
			req.body
		);

		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const categoryService = new CategoryService();
		const existedCategory = await categoryService.findById(
			req.params.categoryId
		);

		if (!existedCategory) {
			throw new CustomAPIError(
				"Invalid Category",
				StatusCodes.NotFound404
			);
		}

		const category = await categoryService.edit(
			existedCategory,
			req.body.type
		);

		res.status(StatusCodes.Ok200).send({ category });
		return;
	} catch (error) {
		throw error;
	}
};

export const remove = async (
	req: Request<{ categoryId: number }, never, never, never>,
	res: Response
) => {
	try {
		const categoryService = new CategoryService();
		const result = categoryService.delete(req.params.categoryId);

		if (!result) {
			throw new CustomAPIError(
				"Invalid Category",
				StatusCodes.NotFound404
			);
		}

		res.status(StatusCodes.Ok200).send({
			message: "Category has been successfully deleted",
		});
		return;
	} catch (error) {
		throw error;
	}
};
