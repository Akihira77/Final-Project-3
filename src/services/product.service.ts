import { sequelize } from "../db/db.js";
import { formatCurrency } from "../utils/formattedCurrency.js";
import ProductModel from "../db/models/product.model.js";
import {
	CreateProductRequestDtoType,
	CreateProductResponseDtoType,
	EditProductRequestDtoType,
	EditProductResponseDtoType,
	PatchProductRequestDtoType,
	PatchProductResponseDtoType,
	editStockProductRequestDtoType,
	editStockProductResponseDtoType,
} from "../db/dtos/products/index.dto.js";

class ProductService {
	private readonly _productRepository;
	constructor() {
		this._productRepository = sequelize.getRepository(ProductModel);
	}
	async findAll(): Promise<ProductModel[]> {
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
		} catch (error) {
			throw error;
		}
	}

	async findById(productId: string): Promise<ProductModel | null> {
		try {
			const product = await this._productRepository.findOne({
				where: {
					id: productId,
				},
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
			const {
				id,
				title,
				price,
				stock,
				CategoryId,
				createdAt,
				updatedAt,
			} = await this._productRepository.create(request);

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

			const {
				id,
				title,
				price,
				stock,
				CategoryId,
				createdAt,
				updatedAt,
			} = result[1][0]!;
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

			const {
				id,
				title,
				price,
				stock,
				CategoryId,
				createdAt,
				updatedAt,
			} = result[1][0]!;
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

	async editStock(
		productId: string,
		request: editStockProductRequestDtoType
	): Promise<editStockProductResponseDtoType> {
		try {
			const result = await this._productRepository.update(request, {
				where: {
					id: productId,
				},
				returning: true,
			});

			const { stock } = result[1][0]!;

			return {
				stock,
			};
		} catch (error) {
			throw error;
		}
	}

	async delete(productId: string): Promise<boolean> {
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

export default ProductService;
