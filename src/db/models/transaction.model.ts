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
import Product from "./product.model.js";
import User from "./user.model.js";

export interface ITransaction {
	id: number;
	ProductId: number;
    product: Product;
	UserId: number;
	user: User;
	quantity: number;
	total_price: number;
	createdAt: Date;
	updatedAt: Date;
}

@Table({ tableName: "Transactions" })
class Transaction extends Model implements ITransaction {
	@PrimaryKey
	@AllowNull(false)
	@AutoIncrement
	@Column(DataType.INTEGER)
	declare id: number;

	@AllowNull(false)
	@ForeignKey(() => Product)
	@Column(DataType.INTEGER)
	declare ProductId: number;

	@BelongsTo(() => Product)
	declare product: ReturnType<() => Product>;
	
    @AllowNull(false)
	@ForeignKey(() => User)
	@Column(DataType.INTEGER)
	declare UserId: number;

	@BelongsTo(() => User)
	declare user: ReturnType<() => User>;

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

export default Transaction;
