import { ValidationError } from "sequelize";

export default function validationSequelizeSchema({ errors }: ValidationError) {
	return errors.map((err) => {
		return err.message;
	});
}
