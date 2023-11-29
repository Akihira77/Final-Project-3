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
	ProductDtoType,
} from "../db/dtos/products/index.dto.js";

class ProductService {
	private readonly _productRepository;
	constructor() {
		this._productRepository = sequelize.getRepository(ProductModel);
	}
	async findAll(): Promise<ProductDtoType[]> {
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
			const product = await this._productRepository.create(request);

			const formattedBalance = formatCurrency(product.price);

			return {
				...product.dataValues,
				price: formattedBalance,
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

			const product = result[1][0]!;
			const formattedBalance = formatCurrency(product.price);

			return {
				...product.dataValues,
				price: formattedBalance,
			};
		} catch (error) {
			throw error;
		}
	}

	async changeCategory(
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

			const product = result[1][0]!;
			const formattedBalance = formatCurrency(product.price);

			return {
				...product.dataValues,
				price: formattedBalance,
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
