import { sequelize } from "../db/db.js";
import { formatCurrency } from "../utils/formattedCurrency.js";
import Product from "../db/models/product.model.js";
export class ProductService {
    _productRepository;
    constructor() {
        this._productRepository = sequelize.getRepository(Product);
    }
    async findAll() {
        try {
            const products = await this._productRepository.findAll({});
            products.map((product) => {
                const formattedBalance = formatCurrency(product.price);
                return {
                    ...product,
                    price: formattedBalance,
                };
            });
            return products;
        }
        catch (error) {
            throw error;
        }
    }
    async findById(productId) {
        try {
            const product = await this._productRepository.findOne({
                where: {
                    id: productId,
                },
            });
            return product;
        }
        catch (error) {
            throw error;
        }
    }
    async add(request) {
        try {
            const { id, title, price, stock, CategoryId, createdAt, updatedAt, } = await this._productRepository.create(request);
            const formattedBalance = formatCurrency(price);
            return {
                id,
                title,
                price: formattedBalance,
                stock,
                CategoryId,
                createdAt,
                updatedAt,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async edit(productId, request) {
        try {
            const result = await this._productRepository.update(request, {
                where: {
                    id: productId,
                },
                returning: true,
            });
            const { id, title, price, stock, CategoryId, createdAt, updatedAt, } = result[1][0];
            const formattedBalance = formatCurrency(price);
            return {
                id,
                title,
                price: formattedBalance,
                stock,
                CategoryId,
                createdAt,
                updatedAt,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async patch(productId, request) {
        try {
            const result = await this._productRepository.update(request, {
                where: {
                    id: productId,
                },
                returning: true,
            });
            const { id, title, price, stock, CategoryId, createdAt, updatedAt, } = result[1][0];
            const formattedBalance = formatCurrency(price);
            return {
                id,
                title,
                price: formattedBalance,
                stock,
                CategoryId,
                createdAt,
                updatedAt,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async editStock(productId, request) {
        try {
            const result = await this._productRepository.update(request, {
                where: {
                    id: productId,
                },
                returning: true,
            });
            const { stock } = result[1][0];
            return {
                stock,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async delete(productId) {
        try {
            const result = await this._productRepository.destroy({
                where: {
                    id: productId,
                },
            });
            return Boolean(result);
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=product.service.js.map