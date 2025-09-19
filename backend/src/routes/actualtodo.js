import express from "express";
import {
  getActualTodos,
  createFromTodoList,
  addActualTodos,
  editActualTodos,
  dataleteActualTodos
} from "../controllers/actualTodoController.js";

const router = express.Router();

router.get("/", getActualTodos);
router.post("/create-from-todo", createFromTodoList);
router.post("/", addActualTodos);
router.delete("/:id", dataleteActualTodos);
router.put("/:id", editActualTodos);

// router.post("/", addTodo);

export default router;
