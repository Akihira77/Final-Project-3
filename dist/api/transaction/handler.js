import { StatusCodes } from "../../utils/constants.js";
import { validateZodSchema } from "../../utils/validateZodSchema.js";
import { CustomAPIError, ZodSchemaError } from "../../errors/index.error.js";
import TransactionService from "../../services/transaction.service.js";
import ProductService from "../../services/product.service.js";
import UserService from "../../services/user.service.js";
import CategoryService from "../../services/category.service.js";
import { CreateTransactionRequestDTO, } from "../../db/dtos/transactions/index.dto.js";
const transactionService = new TransactionService();
const productService = new ProductService();
const userService = new UserService();
const categoryService = new CategoryService();
export const findAllTransactionUser = async (req, res) => {
    try {
        const transactionHistories = await transactionService.findAllTransactionUser(req.user.userId);
        res.status(StatusCodes.Ok200).send({ transactionHistories });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const findAllTransactionAdmin = async (req, res) => {
    try {
        const transactionHistories = await transactionService.findAllTransactionAdmin();
        res.status(StatusCodes.Ok200).send({ transactionHistories });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const findTransactionById = async (req, res) => {
    try {
        const userRole = req.user.role;
        let result;
        if (userRole === "admin") {
            result = await transactionService.findTransactionByIdAdmin(req.params.transactionId);
        }
        else {
            result = await transactionService.findTransactionByIdCustomer(req.params.transactionId, req.user.userId);
        }
        if (typeof result === "string") {
            res.status(StatusCodes.NotFound404).send({ message: result });
            return;
        }
        res.status(StatusCodes.Ok200).send({ ...result });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const addTransaction = async (req, res) => {
    try {
        const validationResult = validateZodSchema(CreateTransactionRequestDTO, req.body);
        if (!validationResult.success) {
            throw new ZodSchemaError(validationResult.errors);
        }
        const productIdString = req.body.ProductId.toString();
        const product = await productService.findById(productIdString);
        if (!product) {
            throw new CustomAPIError("Product does not found", StatusCodes.NotFound404);
        }
        if (req.body.quantity > product.stock) {
            throw new CustomAPIError("Insufficient product stock, available stock : " +
                product.stock, StatusCodes.BadRequest400);
        }
        const user = await userService.findByUserId(req.user.userId);
        if (!user) {
            throw new CustomAPIError("The user who is logging in is not yet registered", StatusCodes.NotFound404);
        }
        if (user.balance < product.price) {
            throw new CustomAPIError("The balance you have is not enough, current balance : " +
                user.balance, StatusCodes.BadRequest400);
        }
        const category = await categoryService.findById(product.CategoryId);
        if (!category) {
            throw new CustomAPIError("category does not found", StatusCodes.NotFound404);
        }
        const result = await transactionService.add(user, product, category, req.body);
        res.status(StatusCodes.Created201).send({
            message: "You Have Successfully purchase the product",
            transactionBill: {
                ...result,
            },
        });
        return;
    }
    catch (error) {
        throw error;
    }
};
//# sourceMappingURL=handler.js.map