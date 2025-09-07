import { Sequelize } from "sequelize";
import dbConfig from "../config/config.js";

const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
