import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import { sequelize } from "./db/db.js";
import userEndpoint from "./api/users/endpoints.js";
import { ErrorHandlerMiddleware } from "./api/middlewares/error-handler.middleware.js";

export const startServer = async () => {
	await sequelize.sync();
	const app = express();

	// MIDDLEWARE
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cors());
	app.use(morgan("dev"));

	// ROUTER
	app.use("/api/users", userEndpoint);

	// Catch not found route
	app.all("*", (req, res) => {
		res.status(404).send({ msg: "Invalid Route" });
		return;
	});

	// Error Middleware
	app.use(ErrorHandlerMiddleware);

	return app;
};
