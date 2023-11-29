import { sequelize } from "../db/db.js";
import CategoryModel from "../db/models/category.model.js";
import ProductModel from "../db/models/product.model.js";
class CategoryService {
    _categoryRepository;
    _productRepository;
    constructor() {
        this._categoryRepository = sequelize.getRepository(CategoryModel);
        this._productRepository = sequelize.getRepository(ProductModel);
    }
    async findAll() {
        try {
            const categories = await this._categoryRepository.findAll({
                include: [
                    {
                        model: this._productRepository,
                    },
                ],
            });
            return categories;
        }
        catch (error) {
            throw error;
        }
    }
    async add(type) {
        try {
            const result = await this._categoryRepository.create({ type });
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async edit(category, newType) {
        try {
            const affectedCategories = await this._categoryRepository.update({ type: newType }, {
                where: {
                    id: category.id,
                },
                returning: true,
            });
            const updatedCategory = affectedCategories["1"][0];
            return updatedCategory;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(categoryId) {
        try {
            const affectedCategories = await this._categoryRepository.destroy({
                where: {
                    id: categoryId,
                },
            });
            return Boolean(affectedCategories);
        }
        catch (error) {
            throw error;
        }
    }
    async findById(categoryId) {
        try {
            const category = await this._categoryRepository.findByPk(categoryId);
            return category;
        }
        catch (error) {
            throw error;
        }
    }
}
export default CategoryService;
//# sourceMappingURL=category.service.js.map