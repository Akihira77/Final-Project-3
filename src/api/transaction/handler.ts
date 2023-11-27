import { Request, Response } from "express";

import { StatusCodes } from "../../utils/constants.js";
import {
	CreateTransactionRequestDTO,
	CreateTransactionRequestDtoType,
} from "../../db/dtos/transactions/create.dto.js";
import { validateZodSchema } from "../../utils/validateZodSchema.js";
import { CustomAPIError, ZodSchemaError } from "../../errors/index.error.js";
import { TransactionService } from "../../services/transaction.service.js";
import Product from "../../db/models/product.model.js";
import { ProductService } from "../../services/product.service.js";
import User from "../../db/models/user.model.js";
import UserService from "../../services/user.service.js";
import CategoryService from "../../services/category.service.js";
import Category from "../../db/models/category.model.js";


const transactionService = new TransactionService();
const productService = new ProductService();
const userService = new UserService();
const categoryService = new CategoryService();

export const findAllTransactionUser = async (req: Request, res: Response) => {
	try {
		const transactions = await transactionService.findAllTransactionUser(req.user.userId);

		res.status(StatusCodes.Ok200).send({ transactions });
		return;
	} catch (error) {
		throw error;
	}
};

export const findAllTransactionAdmin = async (req: Request, res: Response) => {
	try {
		const transactions = await transactionService.findAllTransactionAdmin();

        if (!req.user.role || req.user.role === "" || req.user.role === "customer") {
			throw new CustomAPIError(
				"The Customer role must not access this endpoint",
				StatusCodes.BadRequest400
			);
		}

		res.status(StatusCodes.Ok200).send({ transactions });
		return;
	} catch (error) {
		throw error;
	}
};

export const findTransactionById = async (
    req: Request<{transactionId: string}, never, never, never>,
    res: Response
) => {
	try {
		const transactions = await transactionService.findTransactionById(req.params.transactionId);

        if (!req.user.role || req.user.role === "" || req.user.role === "customer") {
			throw new CustomAPIError(
				"The Customer role must not access this endpoint",
				StatusCodes.BadRequest400
			);
		}

		res.status(StatusCodes.Ok200).send({ transactions });
		return;
	} catch (error) {
		throw error;
	}
};

export const addTransaction = async (
	req: Request<never, never, CreateTransactionRequestDtoType, never>,
	res: Response
) => {
	try {
		const validationResult = validateZodSchema(
			CreateTransactionRequestDTO,
			req.body
		);

		if (!validationResult.success) {
			throw new ZodSchemaError(validationResult.errors);
		}

        // VALIDASI PRODUCT
        const productIdString: string = req.body.ProductId.toString();
        const product: Product | null = await productService.findById(productIdString);
        if (!product) {
           throw new CustomAPIError(
				"Product does not found",
				StatusCodes.NotFound404
			);
        }

        if (req.body.quantity > product.stock) {
            throw new CustomAPIError(
                 "Insufficient product stock, available stock : " + product.stock,
                 StatusCodes.BadRequest400
             );
         }

         // VALIDASI BALANCE USER
        const user: User | null = await userService.findByUserId(req.user.userId);
        if (!user) {
            throw new CustomAPIError(
                "The user who is logging in is not yet registered",
                 StatusCodes.NotFound404
             );
         }

        if (user.balance < product.price) {
            throw new CustomAPIError(
                 "The balance you have is not enough, current balance : " + user.balance,
                 StatusCodes.BadRequest400
             );
            }
            
        const category: Category | null = await categoryService.findById(product.CategoryId);
        if (!category) {
            throw new CustomAPIError(
                "category does not found",
                 StatusCodes.NotFound404
             );
         }
		const result = await transactionService.add(req.user.userId, req.body);
         // Kurangi stok produk setelah transaksi berhasil
        const updatedStock = product.stock - req.body.quantity;
        await productService.editStock(productIdString, { stock: updatedStock });
         // Kurangi balance user setelah transaksi berhasil
        const total_price = product.price * req.body.quantity;
        const updatedBalance = user.balance - total_price;
        await userService.editBalanceIfTransactionSuccess(req.user.userId, { balance: updatedBalance });
         // Tambah sold_product_amount category setelah transaksi berhasil
         const updatedSPA = category.sold_product_amount + req.body.quantity;
         await categoryService.editSPA(product.CategoryId, { sold_product_amount: updatedSPA });

		res.status(StatusCodes.Created201).send({ 
			message: "Your Have Successfully purchase the product",
            transactionBill:{
                ...result 
            },
        });
		return;
	} catch (error) {
		throw error;
	}
};


// export const updateTransaction = async (
// 	req: Request<{ transactionId: string }, never, EditTransactionRequestDtoType, never>,
// 	res: Response
// ) => {
// 	try {
// 		const validationResult = validateZodSchema(
// 			EditTransactionRequestDTO,
// 			req.body
// 		);

// 		if (!req.user.role || req.user.role === "" || req.user.role === "customer") {
// 			throw new CustomAPIError(
// 				"The Customer role must not access this endpoint",
// 				StatusCodes.BadRequest400
// 			);
// 		}

// 		if (!validationResult.success) {
// 			throw new ZodSchemaError(validationResult.errors);
// 		}

// 		const existedTransaction = await transactionService.findById(req.params.transactionId);

// 		if (!existedTransaction) {
// 			throw new CustomAPIError(
// 				"Transaction does not found",
// 				StatusCodes.NotFound404
// 			);
// 		}

// 		const result = await transactionService.edit(req.params.transactionId, req.body);

// 		res.status(StatusCodes.Ok200).send({ transaction: result });
// 		return;
// 	} catch (error) {
// 		throw error;
// 	}
// };

// export const patchTransaction = async (
// 	req: Request<{ transactionId: string }, never, PatchTransactionRequestDtoType, never>,
// 	res: Response
// ) => {
// 	try {
// 		const validationResult = validateZodSchema(
// 			PatchTransactionRequestDTO,
// 			req.body
// 		);

// 		if (!req.user.role || req.user.role === "" || req.user.role === "customer") {
// 			throw new CustomAPIError(
// 				"The Customer role must not access this endpoint",
// 				StatusCodes.BadRequest400
// 			);
// 		}

// 		if (!validationResult.success) {
// 			throw new ZodSchemaError(validationResult.errors);
// 		}

// 		const existedTransaction = await transactionService.findById(req.params.transactionId);

// 		if (!existedTransaction) {
// 			throw new CustomAPIError(
// 				"Transaction does not found",
// 				StatusCodes.NotFound404
// 			);
// 		}

// 		const result = await transactionService.patch(req.params.transactionId, req.body);

// 		res.status(StatusCodes.Ok200).send({ transaction: result });
// 		return;
// 	} catch (error) {
// 		throw error;
// 	}
// };

// export const removeTransaction = async (
// 	req: Request<{ transactionId: string }, never, never, never>,
// 	res: Response
// ) => {
// 	try {
// 		if (!req.user.role || req.user.role === "" || req.user.role === "customer") {
// 			throw new CustomAPIError(
// 				"The Customer role must not access this endpoint",
// 				StatusCodes.BadRequest400
// 			);
// 		}
		
// 		if (!req.params.transactionId || req.params.transactionId === "") {
// 			throw new CustomAPIError(
// 				"TransactionId must be provided",
// 				StatusCodes.BadRequest400
// 			);
// 		}

// 		const result = await transactionService.delete(req.params.transactionId);
// 		if (!result) {
// 			throw new CustomAPIError(
// 				"Transaction does not found",
// 				StatusCodes.NotFound404
// 			);
// 		}

// 		res.status(StatusCodes.Ok200).send({
// 			message: "Your transaction has been successfully deleted",
// 		});
// 		return;
// 	} catch (error) {
// 		throw error;
// 	}
// };