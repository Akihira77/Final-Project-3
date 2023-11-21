import { CustomAPIError } from "../../errors/index.error.js";
import { StatusCodes } from "../../utils/constants.js";
import { jwtVerify } from "../../utils/jwt.js";
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token || token === "" || Array.isArray(token)) {
            throw new CustomAPIError("Authorization Failed", StatusCodes.Forbidden403);
        }
        const payload = jwtVerify(token);
        req.user = payload.user;
        next();
    }
    catch (error) {
        throw error;
    }
};
export default authMiddleware;
//# sourceMappingURL=auth.middleware.js.map