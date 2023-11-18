import express from "express";
import * as userHandler from "./handler.js";

const userEndpoint = express.Router();

userEndpoint.post("/register", userHandler.register);

export default userEndpoint;
