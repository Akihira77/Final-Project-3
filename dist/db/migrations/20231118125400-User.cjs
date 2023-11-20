"use strict";
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
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            gender: {
                type: Sequelize.STRING,
                validate: {
                    is: ["male", "female"],
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
                defaultValue: Date.now(),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Users");
    },
};
export {};
