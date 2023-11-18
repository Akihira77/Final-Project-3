import "express-async-errors";
import express from "express";
import cors from "cors";
import morgan from "morgan";

export const startServer = () => {
	const app = express();

	// Middleware
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cors());
	app.use(morgan("dev"));

	// Catch not found route
	app.use("*", (req, res) => {
		res.status(404).send({ msg: "Invalid Route" });
		return;
	});

	// Error Middleware

	return app;
};
