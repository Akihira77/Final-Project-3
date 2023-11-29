import { CreateCategoryRequestDTO, EditCategoryRequestDTO, } from "../../db/dtos/category/index.dto.js";
import { validateZodSchema } from "../../utils/validateZodSchema.js";
import { CustomAPIError, ZodSchemaError } from "../../errors/index.error.js";
import CategoryService from "../../services/category.service.js";
import { StatusCodes } from "../../utils/constants.js";
const categoryService = new CategoryService();
export const findAll = async (req, res) => {
    try {
        const categories = await categoryService.findAll();
        res.status(StatusCodes.Ok200).send({ categories });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const add = async (req, res) => {
    try {
        const validationResult = validateZodSchema(CreateCategoryRequestDTO, req.body);
        if (!validationResult.success) {
            throw new ZodSchemaError(validationResult.errors);
        }
        const category = await categoryService.add(req.body.type);
        res.status(StatusCodes.Created201).send({ category });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const edit = async (req, res) => {
    try {
        const validationResult = validateZodSchema(EditCategoryRequestDTO, req.body);
        if (!validationResult.success) {
            throw new ZodSchemaError(validationResult.errors);
        }
        const existedCategory = await categoryService.findById(req.params.categoryId);
        if (!existedCategory) {
            throw new CustomAPIError("Invalid Category", StatusCodes.NotFound404);
        }
        const category = await categoryService.edit(existedCategory, req.body.type);
        res.status(StatusCodes.Ok200).send({ category });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const remove = async (req, res) => {
    try {
        const result = categoryService.delete(req.params.categoryId);
        if (!result) {
            throw new CustomAPIError("Invalid Category", StatusCodes.NotFound404);
        }
        res.status(StatusCodes.Ok200).send({
            message: "Category has been successfully deleted",
        });
        return;
    }
    catch (error) {
        throw error;
    }
};
//# sourceMappingURL=handler.js.map