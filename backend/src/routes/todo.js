import express from "express";
import { getTodos, addTodos, deleteTodos, editTodos } from "../controllers/todoController.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", addTodos);
router.delete("/:id", deleteTodos);
router.put("/:id", editTodos);
// router.post("/", addTodo);

export default router;
