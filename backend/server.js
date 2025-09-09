import express from "express";
// import bodyParser from "body-parser";
import cors from "cors";
import todoRoutes from "./src/routes/todo.js";
import actualTodoRoutes from "./src/routes/actualtodo.js";

const app = express();

app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // parse JSON
app.use(express.urlencoded({ extended: true })); // parse form

app.use("/api/todos", todoRoutes);
app.use("/api/actualtodos", actualTodoRoutes);

const PORT = 5000; // backend jalan di 5000, jangan 3000 (bentrok React)
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
