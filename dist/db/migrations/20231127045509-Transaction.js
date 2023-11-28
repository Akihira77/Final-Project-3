"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Transactions", {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                type: Sequelize.INTEGER,
            },
            ProductId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Products",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            UserId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            quantity: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            total_price: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Date.now(),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Transactions");
    },
};
//# sourceMappingURL=20231127045509-Transaction.js.map