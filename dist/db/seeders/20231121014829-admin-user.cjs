"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
module.exports = {
    async up(queryInterface, Sequelize) {
        async function generateSalt() {
            return await bcrypt.genSalt(10);
        }
        await queryInterface.bulkInsert("Users", [
            {
                full_name: "admin user",
                email: "user.admin@example.com",
                password: await bcrypt.hash("admin123", await generateSalt()),
                gender: "female",
                role: "admin",
                createdAt: new Date(),
            },
        ]);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", { role: "admin" }, {});
    },
};
//# sourceMappingURL=20231121014829-admin-user.cjs.map