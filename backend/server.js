import express from "express";
// import bodyParser from "body-parser";
import cors from "cors";
import todoRoutes from "./src/routes/todo.js";
import actualTodoRoutes from "./src/routes/actualtodo.js";
import completeTodoRoutes from "./src/routes/completetodo.js";
import sequelize from "./config/database.js";

sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Sync error:", err));

const app = express();

app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // parse JSON
app.use(express.urlencoded({ extended: true })); // parse form

app.use("/api/todos", todoRoutes);

/*Untuk console.log hit URL */
// app.use("/api/todos", (req, res, next) => {
//   console.log("Todos route hit:", req.method, req.url);
//   next();
// }, todoRoutes);
app.use("/api/actualtodos", actualTodoRoutes);
// app.use("/api/completetodos", completeTodoRoutes);
app.use(
  "/api/completetodos",
  (req, res, next) => {
    console.log("HIT:", req.originalUrl);
    next();
  },
  completeTodoRoutes
);

const PORT = 5000; // backend jalan di 5000, jangan 3000 (bentrok React)
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
