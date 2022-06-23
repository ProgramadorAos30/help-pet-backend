"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tb_assistance", {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "assistance_id",
        autoIncrement: true,
        primaryKey: true,
      },
      petId: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "tb_pet",
          key: "pet_id",
        },
        field: "pet_id",
      },
      assistanceDescription: {
        type: Sequelize.DataTypes.TEXT,
        field: "assistance_description",
      },
      paymentInfo: {
        type: Sequelize.DataTypes.STRING,
        field: "payment_info",
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
    await queryInterface.dropTable("tb_assistance");
  },
};
