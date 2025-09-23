import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // instance sequelize

const CompleteTodo = sequelize.define("CompleteTodos", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default CompleteTodo;
