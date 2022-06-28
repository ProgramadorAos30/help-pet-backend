"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tb_user", {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "pet_id",
      },
      fullName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        field: "full_name",
      },
      phone: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      birthDate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        field: "birth_date",
      },
      documentType: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      document: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        field: "updated_at",
      },
      deletedAt: {
        type: Sequelize.DataTypes.DATE,
        field: "deleted_at",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tb_user");
  },
};
