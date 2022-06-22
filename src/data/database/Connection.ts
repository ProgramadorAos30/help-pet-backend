import { Sequelize } from "sequelize";
import config from "../../../config/config.json";

export default {
  getConnection: () => {
    const { development } = config;
    const connection = new Sequelize(development.database, development.username, development.password, {
      host: development.host,
      dialect: "mysql",
      logging: false,
    });
    return connection;
  },
};
