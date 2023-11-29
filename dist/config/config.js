import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: "./.env.development" });
}
else {
    dotenv.config();
}
export const { PORT, JWT_SECRET, DB_POSTGRES } = process.env;
//# sourceMappingURL=config.js.map