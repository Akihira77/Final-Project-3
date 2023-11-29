import {
	AllowNull,
	AutoIncrement,
	BelongsTo,
	Column,
	CreatedAt,
	DataType,
	ForeignKey,
	NotEmpty,
	PrimaryKey,
	Table,
	UpdatedAt,
	Model,
	Max,
	Min,
} from "sequelize-typescript";
import CategoryModel from "./category.model.js";

export interface IProductModel {
	id: number;
	title: string;
	price: number;
	stock: number;
	CategoryId: number;
	Category: CategoryModel;
	createdAt: Date;
	updatedAt: Date;
}

@Table({ tableName: "Products" })
class ProductModel extends Model implements IProductModel {
	@PrimaryKey
	@AllowNull(false)
	@AutoIncrement
	@Column(DataType.INTEGER)
	declare id: number;

	@AllowNull(false)
	@NotEmpty
	@Column(DataType.STRING)
	declare title: string;

	@Max(50_000_000)
	@Min(0)
	@AllowNull(false)
	@NotEmpty
	@Column(DataType.STRING)
	declare price: number;

	@Min(5)
	@AllowNull(false)
	@NotEmpty
	@Column(DataType.STRING)
	declare stock: number;

	@AllowNull(false)
	@ForeignKey(() => CategoryModel)
	@Column(DataType.INTEGER)
	declare CategoryId: number;

	@BelongsTo(() => CategoryModel)
	declare Category: ReturnType<() => CategoryModel>;

	@AllowNull(false)
	@CreatedAt
	@Column(DataType.DATE)
	declare createdAt: Date;

	@AllowNull(false)
	@UpdatedAt
	@Column(DataType.DATE)
	declare updatedAt: Date;
}

export default ProductModel;
