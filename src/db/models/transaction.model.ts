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
} from "sequelize-typescript";
import ProductModel from "./product.model.js";
import UserModel from "./user.model.js";

export interface ITransactionModel {
	id: number;
	ProductId: number;
	product: ProductModel;
	UserId: number;
	user: UserModel;
	quantity: number;
	total_price: number;
	createdAt: Date;
	updatedAt: Date;
}

@Table({ tableName: "Transactions" })
class TransactionModel extends Model implements ITransactionModel {
	@PrimaryKey
	@AllowNull(false)
	@AutoIncrement
	@Column(DataType.INTEGER)
	declare id: number;

	@AllowNull(false)
	@ForeignKey(() => ProductModel)
	@Column(DataType.INTEGER)
	declare ProductId: number;

	@BelongsTo(() => ProductModel)
	declare product: ReturnType<() => ProductModel>;

	@AllowNull(false)
	@ForeignKey(() => UserModel)
	@Column(DataType.INTEGER)
	declare UserId: number;

	@BelongsTo(() => UserModel)
	declare user: ReturnType<() => UserModel>;

	@AllowNull(false)
	@NotEmpty
	@Column(DataType.STRING)
	declare quantity: number;

	@AllowNull(false)
	@NotEmpty
	@Column(DataType.STRING)
	declare total_price: number;

	@AllowNull(false)
	@CreatedAt
	@Column(DataType.DATE)
	declare createdAt: Date;

	@AllowNull(false)
	@UpdatedAt
	@Column(DataType.DATE)
	declare updatedAt: Date;
}

export default TransactionModel;
