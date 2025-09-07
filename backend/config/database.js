import { Sequelize } from "sequelize";

// ganti user, password, dbname sesuai PostgreSQL kamu
const sequelize = new Sequelize(
  "postgres://postgres:170899@localhost:5432/todoapp",
  {
    dialect: "postgres",
  }
);

export default sequelize;
