"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Products", {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                type: Sequelize.INTEGER,
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            price: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            stock: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            CategoryId: {
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
        await queryInterface.dropTable("Products");
    },
};
export {};
//# sourceMappingURL=20231121020545-Product.cjs.map