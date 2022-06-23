"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tb_organization", {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "organization_id",
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
      },
      latitude: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        field: "lat_location",
      },
      longitude: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        field: "long_location",
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
    await queryInterface.dropTable("tb_organization");
  },
};
