import {
	AllowNull,
	AutoIncrement,
	Column,
	CreatedAt,
	DataType,
	Default,
	HasMany,
	Model,
	NotEmpty,
	PrimaryKey,
	Table,
	Unique,
	UpdatedAt,
} from "sequelize-typescript";
import Product from "./product.model.js";

export interface ICategoryModel {
	id: number;
	type: string;
	sold_product_amount: number;
	products: Product[];
	createdAt: Date;
	updatedAt: Date;
}

@Table({ tableName: "Categories" })
class CategoryModel extends Model implements ICategoryModel {
	@PrimaryKey
	@AutoIncrement
	@AllowNull(false)
	@Column(DataType.INTEGER)
	declare id: number;

	@NotEmpty
	@AllowNull(false)
	@Unique
	@Column(DataType.STRING)
	declare type: string;

	@NotEmpty
	@AllowNull(false)
	@Default(0)
	@Column(DataType.INTEGER)
	declare sold_product_amount: number;

	@HasMany(() => Product)
	declare products: Product[];

	@CreatedAt
	@Column(DataType.DATE)
	declare createdAt: Date;

	@UpdatedAt
	@Column(DataType.DATE)
	declare updatedAt: Date;
}

export default CategoryModel;
