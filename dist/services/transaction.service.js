import Transaction from "../db/models/transaction.model.js";
import User from "../db/models/user.model.js";
import { sequelize } from "../db/db.js";
import { formatCurrency } from "../utils/formattedCurrency.js";
import Product from "../db/models/product.model.js";
export class TransactionService {
    _transactionRepository;
    _userRepository;
    _productRepository;
    constructor() {
        this._transactionRepository = sequelize.getRepository(Transaction);
        this._userRepository = sequelize.getRepository(User);
        this._productRepository = sequelize.getRepository(Product);
    }
    async findAllTransactionUser(userId) {
        try {
            const transactions = await this._transactionRepository.findAll({
                where: {
                    UserId: userId,
                },
                attributes: [
                    'ProductId', 'UserId', 'quantity', 'total_price', 'createdAt', 'updatedAt'
                ],
                include: [{
                        model: this._productRepository,
                        attributes: ['id', 'title', 'price', 'stock', 'CategoryId'],
                    }],
            });
            const formattedTransactions = transactions.map(transaction => ({
                ProductId: transaction.ProductId,
                UserId: transaction.UserId,
                quantity: transaction.quantity,
                total_price: transaction.total_price,
                createdAt: transaction.createdAt,
                updatedAt: transaction.updatedAt,
                Product: transaction.product
            }));
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
                    'ProductId', 'UserId', 'quantity', 'total_price', 'createdAt', 'updatedAt'
                ],
                include: [{
                        model: this._productRepository,
                        attributes: ['id', 'title', 'price', 'stock', 'CategoryId'],
                    },
                    {
                        model: this._userRepository,
                        attributes: ['id', 'email', 'balance', 'gender', 'role'],
                    }],
            });
            const formattedTransactions = transactions.map(transaction => ({
                ProductId: transaction.ProductId,
                UserId: transaction.UserId,
                quantity: transaction.quantity,
                total_price: transaction.total_price,
                createdAt: transaction.createdAt,
                updatedAt: transaction.updatedAt,
                Product: transaction.product,
                User: transaction.user
            }));
            return formattedTransactions;
        }
        catch (error) {
            throw error;
        }
    }
    async findTransactionById(transactionId) {
        try {
            const transactions = await this._transactionRepository.findAll({
                where: {
                    id: transactionId,
                },
                attributes: [
                    'ProductId', 'UserId', 'quantity', 'total_price', 'createdAt', 'updatedAt'
                ],
                include: [{
                        model: this._productRepository,
                        attributes: ['id', 'title', 'price', 'stock', 'CategoryId'],
                    }],
            });
            const formattedTransactions = transactions.map(transaction => ({
                ProductId: transaction.ProductId,
                UserId: transaction.UserId,
                quantity: transaction.quantity,
                total_price: transaction.total_price,
                createdAt: transaction.createdAt,
                updatedAt: transaction.updatedAt,
                Product: transaction.product,
            }));
            return formattedTransactions;
        }
        catch (error) {
            throw error;
        }
    }
    async add(userId, { ProductId, quantity }) {
        try {
            const product = await this._productRepository.findByPk(ProductId);
            if (!product) {
                throw new Error('Product not found');
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
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=transaction.service.js.map