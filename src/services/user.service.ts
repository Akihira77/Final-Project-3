import { sequelize } from "../db/db.js";
import {
	LoginRequestDtoType,
	LoginResponseDtoType,
	RegisterRequestDtoType,
	TopupRequestDtoType,
	TopupResponseDtoType,
	UpdateUserRequestDtoType,
	UpdateUserResponseDtoType,
} from "../db/dtos/users/index.dto.js";
import { RegisterResponseDtoType } from "../db/dtos/users/register.dto.js";
import UserModel from "../db/models/user.model.js";
import { validate } from "../utils/bcrypt.js";
import { formatCurrency } from "../utils/formattedCurrency.js";
import { jwtSign } from "../utils/jwt.js";

class UserService {
	private readonly _userRepository;
	constructor() {
		this._userRepository = sequelize.getRepository(UserModel);
	}

	async findAll(): Promise<UserModel[]> {
		try {
			return await this._userRepository.findAll();
		} catch (error) {
			throw error;
		}
	}

	async register(
		request: RegisterRequestDtoType
	): Promise<RegisterResponseDtoType> {
		try {
			const { id, full_name, email, gender, balance, createdAt } =
				await this._userRepository.create(request);

			const formattedBalance = formatCurrency(balance);

			return {
				user: {
					id,
					full_name,
					email,
					gender,
					balance: formattedBalance,
					createdAt,
				},
			};
		} catch (error) {
			throw error;
		}
	}

	async login(request: LoginRequestDtoType): Promise<LoginResponseDtoType> {
		try {
			const user = await this.findByEmail(request.email);
			if (!user) {
				return "Email or Password is incorrect";
			}

			if (
				!(user.role === "admin" || request.password === user.password)
			) {
				const isMatched = await validate(
					request.password,
					user.password
				);
				if (!isMatched) {
					return "Email or Password is incorrect";
				}
			}

			const token = jwtSign({
				userId: user.id,
				email: user.email,
				full_name: user.full_name,
				role: user.role,
			});

			return { token };
		} catch (error) {
			throw error;
		}
	}

	async findByUserId(userId: number): Promise<UserModel | null> {
		try {
			const existedUser = await this._userRepository.findByPk(userId);

			return existedUser;
		} catch (error) {
			throw error;
		}
	}

	async findByEmail(email: string): Promise<UserModel | null> {
		try {
			const existedUser = await this._userRepository.findOne({
				where: {
					email,
				},
			});

			return existedUser;
		} catch (error) {
			throw error;
		}
	}

	async updateUser(
		user: UserModel,
		request: UpdateUserRequestDtoType
	): Promise<UpdateUserResponseDtoType> {
		try {
			const affectedUsers = await this._userRepository.update(request, {
				where: {
					id: user.id,
					email: user.email,
				},
				returning: true,
			});

			const { id, email, full_name, createdAt, updatedAt } =
				affectedUsers["1"][0]!;

			return {
				user: {
					id,
					full_name,
					email,
					createdAt,
					updatedAt,
				},
			};
		} catch (error) {
			throw error;
		}
	}

	async deleteUser(userId: number): Promise<boolean> {
		try {
			const affectedUser = await this._userRepository.destroy({
				where: {
					id: userId,
				},
			});

			return Boolean(affectedUser);
		} catch (error) {
			throw error;
		}
	}

	async topup(
		balance: number,
		userId: number
	): Promise<TopupResponseDtoType> {
		try {
			const user = await this._userRepository.findByPk(userId);
			if (!user) {
				return "Invalid User";
			}

			const affectedUser = await this._userRepository.update(
				{ balance: balance + user.balance },
				{
					where: {
						id: userId,
					},
					returning: true,
				}
			);

			const updatedUser = affectedUser[1][0]!;

			return updatedUser.balance;
		} catch (error) {
			throw error;
		}
	}

	async editBalanceIfTransactionSuccess(
		userId: number,
		request: TopupRequestDtoType
	): Promise<TopupResponseDtoType> {
		try {
			const result = await this._userRepository.update(request, {
				where: {
					id: userId,
				},
				returning: true,
			});

			const updatedUser = result[1][0]!;

			return updatedUser.balance;
		} catch (error) {
			throw error;
		}
	}
}

export default UserService;
