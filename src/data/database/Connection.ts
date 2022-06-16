import { Sequelize } from "sequelize";
import config from "./config.json";

export default {
  getConnection: () => {
    const connection = new Sequelize(config.DATABASE, config.DB_USERNAME, config.DB_PASSWORD, {
      host: config.DB_HOST,
      dialect: "mysql",
      logging: false,
    });
    return connection;
  },
};
