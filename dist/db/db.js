import { Sequelize } from "sequelize-typescript";
import { DB_POSTGRES } from "../config/config.js";
import { entities } from "./entities.js";
const connectionString = DB_POSTGRES;
export const sequelize = new Sequelize(connectionString, {
    benchmark: true,
    models: entities,
    repositoryMode: true,
});
