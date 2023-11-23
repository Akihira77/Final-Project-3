import { validateZodSchema } from "../../utils/validateZodSchema.js";
import { ZodSchemaError, CustomAPIError } from "../../errors/index.error.js";
import UserService from "../../services/user.service.js";
import { StatusCodes } from "../../utils/constants.js";
import { LoginRequestDTO, RegisterRequestDTO, TopupRequestDTO, UpdateUserRequestDTO, } from "../../db/dtos/users/index.dto.js";
export const findAll = async (req, res) => {
    try {
        const userService = new UserService();
        const users = await userService.findAll();
        res.status(StatusCodes.Ok200).send({ users });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const register = async (req, res) => {
    try {
        const validationResult = validateZodSchema(RegisterRequestDTO, req.body);
        if (!validationResult.success) {
            throw new ZodSchemaError(validationResult.errors);
        }
        const userService = new UserService();
        const result = await userService.register(req.body);
        res.status(StatusCodes.Created201).send(result);
        return;
    }
    catch (error) {
        throw error;
    }
};
export const login = async (req, res) => {
    try {
        const validationResult = validateZodSchema(LoginRequestDTO, req.body);
        if (!validationResult.success) {
            throw new ZodSchemaError(validationResult.errors);
        }
        const userService = new UserService();
        const result = await userService.login(req.body);
        if (typeof result === "string") {
            throw new CustomAPIError(result, StatusCodes.BadRequest400);
        }
        res.status(StatusCodes.Ok200).send({ token: result.token });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const updateUser = async (req, res) => {
    try {
        if (!req.params.userId) {
            throw new CustomAPIError("User Id must be provided", StatusCodes.BadRequest400);
        }
        if (Number(req.params.userId) !== req.user.userId) {
            throw new CustomAPIError("Invalid User", StatusCodes.Conflict409);
        }
        const validationResult = validateZodSchema(UpdateUserRequestDTO, req.body);
        if (!validationResult.success) {
            throw new ZodSchemaError(validationResult.errors);
        }
        const userService = new UserService();
        const existedUser = await userService.findByUserId(req.params.userId);
        if (!existedUser) {
            throw new CustomAPIError("Invalid User", StatusCodes.NotFound404);
        }
        const updateUser = await userService.updateUser(existedUser, req.body);
        res.status(StatusCodes.Ok200).send(updateUser);
        return;
    }
    catch (error) {
        throw error;
    }
};
export const deleteUser = async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        if (userId !== req.user.userId) {
            throw new CustomAPIError("Invalid User", StatusCodes.Conflict409);
        }
        const userService = new UserService();
        const existedUser = await userService.findByUserId(userId);
        if (!existedUser) {
            throw new CustomAPIError("Invalid User", StatusCodes.NotFound404);
        }
        const affectedUser = await userService.deleteUser(userId);
        if (!affectedUser) {
            throw new CustomAPIError("Deleting Failed. Please try again!", StatusCodes.BadRequest400);
        }
        res.status(StatusCodes.Ok200).send({
            message: "Your account has been successfully deleted",
        });
        return;
    }
    catch (error) {
        throw error;
    }
};
export const topup = async (req, res) => {
    try {
        const validationResult = validateZodSchema(TopupRequestDTO, req.body);
        if (!validationResult.success) {
            throw new ZodSchemaError(validationResult.errors);
        }
        const userService = new UserService();
        const result = await userService.topup(req.body.balance, req.user.userId);
        if (typeof result === "string") {
            throw new CustomAPIError(result, StatusCodes.BadRequest400);
        }
        res.status(StatusCodes.Ok200).send({
            message: `Your balance has been successfully updated to Rp ${result}`,
        });
        return;
    }
    catch (error) {
        throw error;
    }
};
//# sourceMappingURL=handler.js.map