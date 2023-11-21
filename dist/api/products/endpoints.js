import { Router } from "express";
import * as productHandler from "./handler.js";
const productEndpoints = Router();
productEndpoints.get("", productHandler.findAllProduct);
productEndpoints.post("", productHandler.addProduct);
productEndpoints.put("/:productId", productHandler.updateProduct);
productEndpoints.patch("/:productId", productHandler.patchProduct);
productEndpoints.delete("/:productId", productHandler.removeProduct);
export default productEndpoints;
//# sourceMappingURL=endpoints.js.map