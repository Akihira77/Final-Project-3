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
import Category from "./category.model.js";

export interface IProduct {
	id: number;
	title: string;
	price: number;
	stock: number;
	CategoryId: number;
	createdAt: Date;
	updatedAt: Date;
}

@Table({ tableName: "Products" })
class Product extends Model implements IProduct {
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
	@ForeignKey(() => Category)
	@Column(DataType.INTEGER)
	declare CategoryId: number;

	@BelongsTo(() => Category)
	declare category: ReturnType<() => Category>;

	@AllowNull(false)
	@CreatedAt
	@Column(DataType.DATE)
	declare createdAt: Date;

	@AllowNull(false)
	@UpdatedAt
	@Column(DataType.DATE)
	declare updatedAt: Date;
}

export default Product;
