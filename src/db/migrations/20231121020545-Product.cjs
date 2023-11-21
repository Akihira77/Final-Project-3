"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
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
			// CategoryId: {
			// 	type: Sequelize.INTEGER,
			// 	allowNull: false,
			// 	references: {
			// 		model: "Categories",
			// 		key: "id",
			// 	},
			// 	onDelete: "CASCADE",
			// 	onUpdate: "CASCADE",
			// },
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
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.dropTable("Products");
	},
};

