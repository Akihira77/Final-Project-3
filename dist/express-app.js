import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import { sequelize } from "./db/db.js";
import userEndpoint from "./api/users/endpoints.js";
import productEndpoint from "./api/products/endpoints.js";
import { ErrorHandlerMiddleware } from "./api/middlewares/error-handler.middleware.js";
import authMiddleware from "./api/middlewares/auth.middleware.js";
import categoryEndpoints from "./api/categories/endpoints.js";
import transactionEndpoint from "./api/transaction/endpoints.js";
export const startServer = async () => {
    await sequelize.sync();
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(morgan("dev"));
    app.use("/api/users", userEndpoint);
    app.use("/api/categories", (req, res, next) => authMiddleware(req, res, next, "admin"), categoryEndpoints);
    app.use("/api/products", authMiddleware, productEndpoint);
    app.use("/api/transactions", authMiddleware, transactionEndpoint);
    app.all("*", (req, res) => {
        res.status(404).send({ msg: "Invalid Route" });
        return;
    });
    app.use(ErrorHandlerMiddleware);
    return app;
};
//# sourceMappingURL=express-app.js.map