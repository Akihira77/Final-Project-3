import {
	AllowNull,
	AutoIncrement,
	BeforeBulkCreate,
	BeforeCreate,
	Column,
	CreatedAt,
	DataType,
	Default,
	Is,
	IsEmail,
	Max,
	Min,
	Model,
	NotEmpty,
	PrimaryKey,
	Table,
	Unique,
	UpdatedAt,
} from "sequelize-typescript";
import { hashPassword } from "../../utils/bcrypt.js";

export const Genders = ["male", "female"] as const;
export const Roles = ["admin", "customer"] as const;

export interface IUserModel {
	id: number;
	full_name: string;
	email: string;
	password: string;
	gender: string;
	role: string;
	balance: number;
	createdAt: Date;
	updatedAt: Date;
}

@Table({ tableName: "Users" })
class UserModel extends Model implements IUserModel {
	@PrimaryKey
	@AutoIncrement
	@AllowNull(false)
	@Column(DataType.INTEGER)
	declare id: number;

	@AllowNull(false)
	@Column(DataType.STRING)
	declare full_name: string;

	@IsEmail
	@Unique
	@NotEmpty
	@AllowNull(false)
	@Column(DataType.STRING)
	declare email: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	declare password: string;

	@Is("Gender", (value: any) => {
		if (!Genders.includes(value)) {
			throw new Error("Gender is invalid");
		}
	})
	@AllowNull(false)
	@Column(DataType.STRING)
	declare gender: string;

	@Default("customer")
	@Is("Role", (value: any) => {
		if (!Roles.includes(value)) {
			throw new Error("Role is invalid");
		}
	})
	@AllowNull(false)
	@Column(DataType.STRING)
	declare role: string;

	@Max(100_000_000)
	@Default(0)
	@Min(0)
	@AllowNull(false)
	@Column(DataType.INTEGER)
	declare balance: number;

	@CreatedAt
	@Column(DataType.DATE)
	declare createdAt: Date;

	@UpdatedAt
	@Column(DataType.DATE)
	declare updatedAt: Date;

	@BeforeCreate
	@BeforeBulkCreate
	static async hashingPassword(instance: UserModel) {
		instance.password = await hashPassword(instance.password);
	}
}

export default UserModel;
