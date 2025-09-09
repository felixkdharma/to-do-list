import express from "express";
import {
  getActualTodos,
  createFromTodoList,
} from "../controllers/actualTodoController.js";

const router = express.Router();

router.get("/", getActualTodos);
router.post("/create-from-todo", createFromTodoList);

// router.post("/", addTodo);

export default router;
