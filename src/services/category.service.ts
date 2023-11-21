import { sequelize } from "../db/db.js";
import Category from "../db/models/category.model.js";

class CategoryService {
	private readonly _categoryRepository;
	constructor() {
		this._categoryRepository = sequelize.getRepository(Category);
	}

	async findAll(): Promise<void> {
		return;
	}

	async add(type: string): Promise<Category> {
		try {
			const result = await this._categoryRepository.create({ type });

			return result;
		} catch (error) {
			throw error;
		}
	}

	async edit(category: Category, newType: string): Promise<Category> {
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

	async findById(categoryId: number): Promise<Category | null> {
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
