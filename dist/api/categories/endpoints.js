import express from "express";
import * as categoryHandler from "./handler.js";
const categoryEndpoints = express.Router();
categoryEndpoints.get("", categoryHandler.findAll);
categoryEndpoints.post("", categoryHandler.add);
categoryEndpoints.patch("/:categoryId", categoryHandler.edit);
categoryEndpoints.delete("/:categoryId", categoryHandler.remove);
export default categoryEndpoints;
//# sourceMappingURL=endpoints.js.map