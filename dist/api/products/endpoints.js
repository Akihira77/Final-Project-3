import { Router } from "express";
import * as productHandler from "./handler.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const productEndpoints = Router();
productEndpoints.get("", productHandler.findAllProduct);
productEndpoints.post("", (req, res, next) => authMiddleware(req, res, next, "admin"), productHandler.addProduct);
productEndpoints.put("/:productId", (req, res, next) => authMiddleware(req, res, next, "admin"), productHandler.updateProduct);
productEndpoints.patch("/:productId", (req, res, next) => authMiddleware(req, res, next, "admin"), productHandler.patchProduct);
productEndpoints.delete("/:productId", (req, res, next) => authMiddleware(req, res, next, "admin"), productHandler.removeProduct);
export default productEndpoints;
//# sourceMappingURL=endpoints.js.map