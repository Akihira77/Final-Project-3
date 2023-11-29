import express from "express";
import * as categoryHandler from "./handler.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const categoryEndpoints = express.Router();
categoryEndpoints
    .use((req, res, next) => authMiddleware(req, res, next, "admin"))
    .get("", categoryHandler.findAll)
    .post("", categoryHandler.add)
    .patch("/:categoryId", categoryHandler.edit)
    .delete("/:categoryId", categoryHandler.remove);
export default categoryEndpoints;
//# sourceMappingURL=endpoints.js.map