import { sequelize } from "../db/db.js";
import {
	EditSPACategoryRequestDtoType,
	editSPACategoryResponseDtoType,
} from "../db/dtos/category/editSPA.dto.js";
import CategoryModel from "../db/models/category.model.js";
import ProductModel from "../db/models/product.model.js";

class CategoryService {
	private readonly _categoryRepository;
	private readonly _productRepository;
	constructor() {
		this._categoryRepository = sequelize.getRepository(CategoryModel);
		this._productRepository = sequelize.getRepository(ProductModel);
	}

	async findAll(): Promise<CategoryModel[]> {
		try {
			const categories = await this._categoryRepository.findAll({
				include: [
					{
						model: this._productRepository,
					},
				],
			});

			return categories;
		} catch (error) {
			throw error;
		}
	}

	async add(type: string): Promise<CategoryModel> {
		try {
			const result = await this._categoryRepository.create({ type });

			return result;
		} catch (error) {
			throw error;
		}
	}

	async edit(
		category: CategoryModel,
		newType: string
	): Promise<CategoryModel> {
		try {
			const affectedCategories = await this._categoryRepository.update(
				{ type: newType },
				{
					where: {
						id: category.id,
					},
					returning: true,
				}
			);

			const updatedCategory = affectedCategories["1"][0]!;

			return updatedCategory;
		} catch (error) {
			throw error;
		}
	}

	async editSPA(
		categoryId: number,
		request: EditSPACategoryRequestDtoType
	): Promise<editSPACategoryResponseDtoType> {
		try {
			const result = await this._categoryRepository.update(request, {
				where: {
					id: categoryId,
				},
				returning: true,
			});

			const { sold_product_amount } = result[1][0]!;

			return {
				sold_product_amount,
			};
		} catch (error) {
			throw error;
		}
	}

	async delete(categoryId: number): Promise<boolean> {
		try {
			const affectedCategories = await this._categoryRepository.destroy({
				where: {
					id: categoryId,
				},
			});

			return Boolean(affectedCategories);
		} catch (error) {
			throw error;
		}
	}

	async findById(categoryId: number): Promise<CategoryModel | null> {
		try {
			const category = await this._categoryRepository.findByPk(
				categoryId
			);

			return category;
		} catch (error) {
			throw error;
		}
	}
}

export default CategoryService;
