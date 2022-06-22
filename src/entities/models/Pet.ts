import { DataTypes } from "sequelize";
import Connection from "../../data/database/Connection";

export const PetModel = Connection.getConnection().define(
  "Pet",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "pet_id",
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    profileImage: {
      type: DataTypes.STRING,
      field: "profile_image",
      allowNull: false,
    },
    animalType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "animal_type",
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "tb_pet",
  }
);


