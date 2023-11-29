"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
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
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		// const Op = Sequelize.Op;
		await queryInterface.bulkDelete("Users", { role: "admin" }, {});
	},
};
