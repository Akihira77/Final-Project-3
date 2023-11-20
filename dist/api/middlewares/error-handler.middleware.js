import { StatusCodes } from "../../utils/constants.js";
import { ValidationError } from "sequelize";
import validationSequelizeSchema from "../../utils/validationSequelizeSchema.js";
import { CustomAPIError, ZodSchemaError } from "../../errors/index.error.js";
export const ErrorHandlerMiddleware = (err, req, res, next) => {
    console.log("Catching error from error handler middleware => ", err);
    if (err instanceof ValidationError) {
        res.status(StatusCodes.BadRequest400).send({
            errors: validationSequelizeSchema(err),
        });
        return;
    }
    else if (err instanceof ZodSchemaError) {
        res.status(err.statusCode).send({ name: err.name, errors: err.errors });
        return;
    }
    else if (err instanceof CustomAPIError) {
        res.status(err.statusCode).send({ message: err.message });
    }
    res.status(StatusCodes.InternalServerError500).send({ err });
    return;
};
