import { DataTypes } from "sequelize";
import Connection from "../../data/database/Connection";

export const AssistanceModel = Connection.getConnection().define(
  "Assistance",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "assistance_id",
      autoIncrement: true,
      primaryKey: true,
    },
    petId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "tb_pet",
        key: "pet_id",
      },
      field: "pet_id",
    },
    assistanceDescription: {
      type: DataTypes.TEXT,
      field: "assistance_description",
    },
    paymentInfo: {
      type: DataTypes.STRING,
      field: "payment_info",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: "deleted_at",
    },
  },
  {
    tableName: "tb_assistance",
  }
);
