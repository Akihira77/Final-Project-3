import {
	CreateTransactionRequestDtoType,
	CreateTransactionResponseDtoType,
} from "../db/dtos/transactions/create.dto.js";
import Transaction from "../db/models/transaction.model.js";
import User from "../db/models/user.model.js";
import { sequelize } from "../db/db.js";
import { formatCurrency } from "../utils/formattedCurrency.js";
import Product from "../db/models/product.model.js";

interface FormattedTransaction {
    ProductId: number;
    UserId: number;
    quantity: number;
    total_price: number;
    createdAt: Date;
    updatedAt: Date;
    Product: Partial<Product>;
    User?: Partial<User>; 
}

export class TransactionService {
	private readonly _transactionRepository;
	private readonly _userRepository;
	private readonly _productRepository;
	constructor() {
		this._transactionRepository = sequelize.getRepository(Transaction);
		this._userRepository = sequelize.getRepository(User);
		this._productRepository = sequelize.getRepository(Product);
	}

    private formatTransaction(transaction: any, includeUser = false): FormattedTransaction {
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
    

    async findAllTransactionUser(userId: number): Promise<FormattedTransaction[] | null> {
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

            const formattedTransactions = transactions.map(transaction =>
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

            const formattedTransactions = transactions.map(transaction =>
                this.formatTransaction(transaction, true)
            );

            return formattedTransactions;
        } catch (error) {
            throw error;
        }
    }


    async findTransactionById(transactionId: string): Promise<FormattedTransaction[] | null> {
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

            const formattedTransactions = transactions.map(transaction =>
                this.formatTransaction(transaction)
            );

            return formattedTransactions;
        } catch (error) {
            throw error;
        }
    }


async add(
    userId: number,
    { ProductId, quantity }: CreateTransactionRequestDtoType
    ): Promise<CreateTransactionResponseDtoType> {
        try {
            const product: Product | null = await this._productRepository.findByPk(ProductId);
            
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
		} catch (error) {
			throw error;
		}
	}
}

