import TransactionModel from "../db/models/transaction.model.js";
import UserModel from "../db/models/user.model.js";
import { sequelize } from "../db/db.js";
import { formatCurrency } from "../utils/formattedCurrency.js";
import ProductModel from "../db/models/product.model.js";
import CategoryModel from "../db/models/category.model.js";
import { Transaction } from "sequelize";
class TransactionService {
    _transactionRepository;
    _userRepository;
    _productRepository;
    _categoryRepository;
    constructor() {
        this._transactionRepository = sequelize.getRepository(TransactionModel);
        this._userRepository = sequelize.getRepository(UserModel);
        this._productRepository = sequelize.getRepository(ProductModel);
        this._categoryRepository = sequelize.getRepository(CategoryModel);
    }
    formatTransaction(transaction, includeUser = false) {
        const formattedTransaction = {
            ProductId: transaction.ProductId,
            UserId: transaction.UserId,
            quantity: transaction.quantity,
            total_price: formatCurrency(transaction.total_price),
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
            Product: {
                ...transaction.Product.dataValues,
                price: formatCurrency(transaction.Product.price),
            },
        };
        if (includeUser && transaction.User) {
            formattedTransaction.User = transaction.User;
        }
        return formattedTransaction;
    }
    async findAllTransactionUser(userId) {
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
            const formattedTransactions = transactions.map((transaction) => this.formatTransaction(transaction));
            return formattedTransactions;
        }
        catch (error) {
            throw error;
        }
    }
    async findAllTransactionAdmin() {
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
            const formattedTransactions = transactions.map((transaction) => this.formatTransaction(transaction, true));
            return formattedTransactions;
        }
        catch (error) {
            throw error;
        }
    }
    async findTransactionByIdAdmin(transactionId) {
        try {
            const transaction = await this._transactionRepository.findByPk(transactionId, {
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
                        as: "Product",
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
            if (!transaction) {
                return "Invalid TransactionHistory";
            }
            const formattedTransactions = this.formatTransaction(transaction);
            return formattedTransactions;
        }
        catch (error) {
            throw error;
        }
    }
    async findTransactionByIdCustomer(transactionId, userId) {
        try {
            const transaction = await this._transactionRepository.findOne({
                where: {
                    id: transactionId,
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
            if (!transaction) {
                return "Invalid TransactionHistory";
            }
            const formattedTransactions = this.formatTransaction(transaction);
            return formattedTransactions;
        }
        catch (error) {
            throw error;
        }
    }
    async add(user, product, category, { ProductId, quantity }) {
        try {
            const result = await sequelize.transaction({
                isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
            }, async (t) => {
                const updatedStock = product.stock - quantity;
                await this._productRepository.update({ stock: updatedStock }, {
                    where: {
                        id: ProductId,
                    },
                    transaction: t,
                });
                const total_price = product.price * quantity;
                const updatedBalance = user.balance - total_price;
                await this._userRepository.update({ balance: updatedBalance }, {
                    where: {
                        id: user.id,
                    },
                    transaction: t,
                });
                const updatedSPA = category.sold_product_amount + quantity;
                await this._categoryRepository.update({ sold_product_amount: updatedSPA }, {
                    where: {
                        id: category.id,
                    },
                    transaction: t,
                });
                const savedTransaction = await this._transactionRepository.create({
                    UserId: user.id,
                    ProductId,
                    quantity,
                    total_price,
                }, { transaction: t });
                return savedTransaction;
            });
            const formattedBalance = formatCurrency(result.total_price);
            return {
                total_price: formattedBalance,
                quantity: result.quantity,
                product_name: product.title,
            };
        }
        catch (error) {
            throw error;
        }
    }
}
export default TransactionService;
//# sourceMappingURL=transaction.service.js.map