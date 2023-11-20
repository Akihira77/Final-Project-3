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
					max: 100_000_000,
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
		await queryInterface.dropTable("Users");
	},
};
