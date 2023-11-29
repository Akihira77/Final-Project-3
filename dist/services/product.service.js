import { sequelize } from "../db/db.js";
import { formatCurrency } from "../utils/formattedCurrency.js";
import ProductModel from "../db/models/product.model.js";
class ProductService {
    _productRepository;
    constructor() {
        this._productRepository = sequelize.getRepository(ProductModel);
    }
    async findAll() {
        try {
            const products = await this._productRepository.findAll();
            const formattedProducts = products.map((product) => {
                const formattedBalance = formatCurrency(product.price);
                return {
                    ...product.dataValues,
                    price: formattedBalance,
                };
            });
            return formattedProducts;
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
            const product = await this._productRepository.create(request);
            const formattedBalance = formatCurrency(product.price);
            return {
                ...product.dataValues,
                price: formattedBalance,
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
            const product = result[1][0];
            const formattedBalance = formatCurrency(product.price);
            return {
                ...product.dataValues,
                price: formattedBalance,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async changeCategory(productId, request) {
        try {
            const result = await this._productRepository.update(request, {
                where: {
                    id: productId,
                },
                returning: true,
            });
            const product = result[1][0];
            const formattedBalance = formatCurrency(product.price);
            return {
                ...product.dataValues,
                price: formattedBalance,
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
export default ProductService;
//# sourceMappingURL=product.service.js.map