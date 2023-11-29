"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            full_name: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true,
                    notEmpty: true,
                },
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            gender: {
                type: Sequelize.STRING,
                validate: {
                    is: ["male", "female"],
                    notEmpty: true,
                },
                allowNull: false,
            },
            role: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    is: ["admin", "customer"],
                },
                defaultValue: "customer",
            },
            balance: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    isInt: true,
                    max: 100000000,
                    min: 0,
                    notEmpty: true,
                },
                defaultValue: 0,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Users");
    },
};
//# sourceMappingURL=20231118125400-User.cjs.map