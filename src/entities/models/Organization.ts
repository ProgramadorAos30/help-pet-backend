import { Sequelize, DataTypes } from "sequelize";
import Connection from "../../data/database/Connection";

export const OrganizationModel = Connection.getConnection().define(
  "Organization",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "organization_id",
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
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "lat_location",
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "long_location",
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
    tableName: "tb_organization",
  }
);
