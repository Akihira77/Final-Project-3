import { Request, Response } from "express";
import { ProductService } from "../../services/product.service.js";
import { StatusCodes } from "../../utils/constants.js";
import {
	CreateProductRequestDTO,
	CreateProductRequestDtoType,
} from "../../db/dtos/products/create.dto.js";
import { validateZodSchema } from "../../utils/validateZodSchema.js";
import { CustomAPIError, ZodSchemaError } from "../../errors/index.error.js";
import {
	EditProductRequestDTO,
	EditProductRequestDtoType,
} from "../../db/dtos/products/edit.dto.js";
import {
	PatchProductRequestDTO,
	PatchProductRequestDtoType,
} from "../../db/dtos/products/patch.dto.js";
import Category from "../../db/models/category.model.js";
import CategoryService from "../../services/category.service.js";

const productService = new ProductService();
const categoryService = new CategoryService();

export const findAllProduct = async (req: Request, res: Response) => {
	try {
		const products = await productService.findAll();

		res.status(StatusCodes.Ok200).send({ products });
		return;
	} catch (error) {
		throw error;
	}
};

export const addProduct = async (
	req: Request<never, never, CreateProductRequestDtoType, never>,
	res: Response
) => {
	try {
		const validationResult = validateZodSchema(
			CreateProductRequestDTO,
			req.body
		);
		
		if (req.body.price > 50000000) {
			throw new CustomAPIError(
				"Maximum Price is Rp. 50.000.000 ",
				StatusCodes.BadRequest400
			);
		}

		if (req.body.stock < 5) {
			throw new CustomAPIError(
				"Minimum Stock is 5 pcs",
				StatusCodes.BadRequest400
			);
		}

		const category: Category | null = await categoryService.findById(req.body.CategoryId);
        if (!category) {
            throw new CustomAPIError(
                "category does not found",
                 StatusCodes.NotFound404
             );
         }

		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const result = await productService.add(req.body);

		res.status(StatusCodes.Created201).send({ ...result });
		return;
	} catch (error) {
		throw error;
	}
};

export const updateProduct = async (
	req: Request<{ productId: string }, never, EditProductRequestDtoType, never>,
	res: Response
) => {
	try {
		const validationResult = validateZodSchema(
			EditProductRequestDTO,
			req.body
		);
		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const existedProduct = await productService.findById(req.params.productId);

		if (!existedProduct) {
			throw new CustomAPIError(
				"Product does not found",
				StatusCodes.NotFound404
			);
		}

		const result = await productService.edit(req.params.productId, req.body);

		res.status(StatusCodes.Ok200).send({ product: result });
		return;
	} catch (error) {
		throw error;
	}
};

export const patchProduct = async (
	req: Request<{ productId: string }, never, PatchProductRequestDtoType, never>,
	res: Response
) => {
	try {
		const validationResult = validateZodSchema(
			PatchProductRequestDTO,
			req.body
		);
		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

		const existedProduct = await productService.findById(req.params.productId);

		if (!existedProduct) {
			throw new CustomAPIError(
				"Product does not found",
				StatusCodes.NotFound404
			);
		}

		const result = await productService.patch(req.params.productId, req.body);

		res.status(StatusCodes.Ok200).send({ product: result });
		return;
	} catch (error) {
		throw error;
	}
};

export const removeProduct = async (
	req: Request<{ productId: string }, never, never, never>,
	res: Response
) => {
	try {
		
		if (!req.params.productId || req.params.productId === "") {
			throw new CustomAPIError(
				"ProductId must be provided",
				StatusCodes.BadRequest400
			);
		}

		const result = await productService.delete(req.params.productId);
		if (!result) {
			throw new CustomAPIError(
				"Product does not found",
				StatusCodes.NotFound404
			);
		}

		res.status(StatusCodes.Ok200).send({
			message: "Your product has been successfully deleted",
		});
		return;
	} catch (error) {
		throw error;
	}
};