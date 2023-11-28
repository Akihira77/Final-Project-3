import {
	CreateTransactionRequestDtoType,
	CreateTransactionResponseDtoType,
} from "../db/dtos/transactions/create.dto.js";
import TransactionModel from "../db/models/transaction.model.js";
import UserModel from "../db/models/user.model.js";
import { sequelize } from "../db/db.js";
import { formatCurrency } from "../utils/formattedCurrency.js";
import ProductModel from "../db/models/product.model.js";
import CategoryModel from "../db/models/category.model.js";
import { Transaction } from "sequelize";

interface FormattedTransaction {
	ProductId: number;
	UserId: number;
	quantity: number;
	total_price: number;
	createdAt: Date;
	updatedAt: Date;
	Product: Partial<ProductModel>;
	User?: Partial<UserModel>;
}

class TransactionService {
	private readonly _transactionRepository;
	private readonly _userRepository;
	private readonly _productRepository;
	private readonly _categoryRepository;
	constructor() {
		this._transactionRepository = sequelize.getRepository(TransactionModel);
		this._userRepository = sequelize.getRepository(UserModel);
		this._productRepository = sequelize.getRepository(ProductModel);
		this._categoryRepository = sequelize.getRepository(CategoryModel);
	}

	private formatTransaction(
		transaction: any,
		includeUser = false
	): FormattedTransaction {
		const formattedTransaction: FormattedTransaction = {
			ProductId: transaction.ProductId,
			UserId: transaction.UserId,
			quantity: transaction.quantity,
			total_price: transaction.total_price,
			createdAt: transaction.createdAt,
			updatedAt: transaction.updatedAt,
			Product: transaction.product,
		};

		if (includeUser && transaction.user) {
			formattedTransaction.User = transaction.user;
		}

		return formattedTransaction;
	}

	async findAllTransactionUser(
		userId: number
	): Promise<FormattedTransaction[] | null> {
		try {
			const transactions = await this._transactionRepository.findAll({
				where: {
					UserId: userId,
				},
				attributes: [
					"ProductId",
					"UserId",
					"quantity",
					"total_price",
					"createdAt",
					"updatedAt",
				],
				include: [
					{
						model: this._productRepository,
						attributes: [
							"id",
							"title",
							"price",
							"stock",
							"CategoryId",
						],
					},
				],
			});

			const formattedTransactions = transactions.map((transaction) =>
				this.formatTransaction(transaction)
			);

			return formattedTransactions;
		} catch (error) {
			throw error;
		}
	}

	async findAllTransactionAdmin(): Promise<FormattedTransaction[] | null> {
		try {
			const transactions = await this._transactionRepository.findAll({
				attributes: [
					"ProductId",
					"UserId",
					"quantity",
					"total_price",
					"createdAt",
					"updatedAt",
				],
				include: [
					{
						model: this._productRepository,
						attributes: [
							"id",
							"title",
							"price",
							"stock",
							"CategoryId",
						],
					},
					{
						model: this._userRepository,
						attributes: [
							"id",
							"email",
							"balance",
							"gender",
							"role",
						],
					},
				],
			});

			const formattedTransactions = transactions.map((transaction) =>
				this.formatTransaction(transaction, true)
			);

			return formattedTransactions;
		} catch (error) {
			throw error;
		}
	}

	async findTransactionById(
		transactionId: string
	): Promise<FormattedTransaction> {
		try {
			const transaction = await this._transactionRepository.findByPk(
				transactionId,
				{
					attributes: [
						"ProductId",
						"UserId",
						"quantity",
						"total_price",
						"createdAt",
						"updatedAt",
					],
					include: [
						{
							model: this._productRepository,
							attributes: [
								"id",
								"title",
								"price",
								"stock",
								"CategoryId",
							],
						},
					],
				}
			);

			const formattedTransactions = this.formatTransaction(transaction);

			return formattedTransactions;
		} catch (error) {
			throw error;
		}
	}

	async addTransaction(
		user: UserModel,
		product: ProductModel,
		category: CategoryModel,
		{ ProductId, quantity }: CreateTransactionRequestDtoType
	): Promise<CreateTransactionResponseDtoType> {
		try {
			const result = await sequelize.transaction(
				{
					isolationLevel:
						Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
				},
				async (t: Transaction) => {
					// Kurangi stok produk setelah transaksi berhasil
					const updatedStock = product.stock - quantity;
					await this._productRepository.update(
						{ stock: updatedStock },
						{
							where: {
								id: ProductId,
							},
							transaction: t,
						}
					);

					// Kurangi balance user setelah transaksi berhasil
					const total_price = product.price * quantity;
					const updatedBalance = user.balance - total_price;
					await this._userRepository.update(
						{ balance: updatedBalance },
						{
							where: {
								id: user.id,
							},
							transaction: t,
						}
					);

					// Tambah sold_product_amount category setelah transaksi berhasil
					const updatedSPA = category.sold_product_amount + quantity;
					await this._categoryRepository.update(
						{ sold_product_amount: updatedSPA },
						{
							where: {
								id: category.id,
							},
							transaction: t,
						}
					);

					const transaction =
						await this._transactionRepository.create(
							{
								UserId: user.id,
								ProductId,
								quantity,
								total_price,
							},
							{ transaction: t }
						);

					return transaction;
				}
			);

			const formattedBalance = formatCurrency(result.total_price);

			return {
				total_price: formattedBalance,
				quantity: result.quantity,
				productName: product.title,
			};
		} catch (error) {
			throw error;
		}
	}

	async add(
		userId: number,
		{ ProductId, quantity }: CreateTransactionRequestDtoType
	): Promise<CreateTransactionResponseDtoType> {
		try {
			const product: ProductModel | null =
				await this._productRepository.findByPk(ProductId);

			if (!product) {
				throw new Error("Product not found");
			}

			const total_price = product.price * quantity;

			const transaction = await this._transactionRepository.create({
				UserId: userId,
				ProductId,
				quantity,
				total_price,
			});

			const formattedBalance = formatCurrency(total_price);

			return {
				total_price: formattedBalance,
				quantity: transaction.quantity,
				productName: product.title,
			};
		} catch (error) {
			throw error;
		}
	}
}

export default TransactionService;
