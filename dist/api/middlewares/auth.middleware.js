import { CustomAPIError } from "../../errors/index.error.js";
import { StatusCodes } from "../../utils/constants.js";
import { jwtVerify } from "../../utils/jwt.js";
const authMiddleware = (req, res, next, rolePermitted = undefined) => {
    try {
        const token = req.headers.token;
        if (!token || token === "" || Array.isArray(token)) {
            throw new CustomAPIError("Authentication Failed", StatusCodes.Forbidden403);
        }
        const payload = jwtVerify(token);
        if (rolePermitted) {
            console.log(rolePermitted);
            if (payload.user.role !== rolePermitted) {
                throw new CustomAPIError("Invalid Credentials", StatusCodes.Forbidden403);
            }
        }
        req.user = payload.user;
        next();
    }
    catch (error) {
        throw error;
    }
};
export default authMiddleware;
//# sourceMappingURL=auth.middleware.js.map