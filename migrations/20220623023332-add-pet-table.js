"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tb_pet", {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "pet_id",
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
      },
      profileImage: {
        type: Sequelize.DataTypes.STRING,
        field: "profile_image",
        allowNull: false,
      },
      animalType: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        field: "animal_type",
      },
      breed: {
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
    await queryInterface.dropTable("tb_pet");
  },
};
