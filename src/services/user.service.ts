import { sequelize } from "../db/db.js";
import {
	RegisterRequestDtoType,
	RegisterResponseDtoType,
} from "../db/dtos/users/register.dto.js";
import User from "../db/models/user.model.js";
import { formatCurrency } from "../utils/formattedCurrency.js";

class UserService {
	private readonly _userRepository;
	constructor() {
		this._userRepository = sequelize.getRepository(User);
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
}

export default UserService;
