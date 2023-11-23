import {
	CreateProductRequestDtoType,
	CreateProductResponseDtoType,
} from "./../db/dtos/products/create.dto";
import Product from "../db/models/product.model.js";
// import Category from "../db/models/category.model.js";
import User from "../db/models/user.model.js";
import { sequelize } from "../db/db.js";
import {
	EditProductRequestDtoType,
	EditProductResponseDtoType,
} from "../db/dtos/products/edit.dto.js";
import {
	PatchProductRequestDtoType,
	PatchProductResponseDtoType,
} from "../db/dtos/products/patch.dto";
import { formatCurrency } from "../utils/formattedCurrency.js";


export class ProductService {
	private readonly _productRepository;
	// private readonly _categoryRepository;
	constructor() {
		this._productRepository = sequelize.getRepository(Product);
		// this._categoryRepository = sequelize.getRepository(Category);
	}

	async findAll(): Promise<Product[]> {
    try {
        const products = await this._productRepository.findAll({});
		
        products.map(product => {
            const formattedBalance = formatCurrency(product.price);

            return {
                ...product,
                price: formattedBalance,
            };
        });

        return products;
    } catch (error) {
        throw error;
    }
}

	async findById(productId: string): Promise<Product | null> {
		try {
			const product = await this._productRepository.findOne({
				where: {
					id: productId,
				}
			});
	
			return product;
		} catch (error) {
			throw error;
		}
	}

	async add(
		request: CreateProductRequestDtoType
		): Promise<CreateProductResponseDtoType> {
		try {
			const { id, title, price, stock, CategoryId, createdAt, updatedAt } =
				await this._productRepository.create(request);

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
		} catch (error) {
			throw error;
		}
	}

	async edit(
		productId: string,
		request: EditProductRequestDtoType
	): Promise<EditProductResponseDtoType> {
		try {
			const result = await this._productRepository.update(request, {
				where: {
					id: productId,			
				},
				returning: true,
			});

			const { id, title, price, stock, CategoryId, createdAt, updatedAt } =
				result[1][0]!;
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
		} catch (error) {
			throw error;
		}
	}

	async patch(
		productId: string,
		request: PatchProductRequestDtoType
	): Promise<PatchProductResponseDtoType> {
		try {
			const result = await this._productRepository.update(request, {
				where: {
					id: productId,			
				},
				returning: true,
			});

			const { id, title, price, stock, CategoryId, createdAt, updatedAt } =
				result[1][0]!;
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
		} catch (error) {
			throw error;
		}
	}

	async delete(
		productId: string
	): Promise<boolean> {
		try {
			const result = await this._productRepository.destroy({
				where: { 
					id: productId,
				},
			});

			return Boolean(result);
		} catch (error) {
			throw error;
		}
	}
}

