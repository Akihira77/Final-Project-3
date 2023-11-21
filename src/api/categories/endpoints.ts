import express from "express";
import * as categoryHandler from "./handler.js";

const categoryEndpoints = express.Router();

categoryEndpoints.post("", categoryHandler.add);

export default categoryEndpoints;
