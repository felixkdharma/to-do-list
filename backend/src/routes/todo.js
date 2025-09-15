import express from "express";
import { getTodos, addTodos, deleteTodos } from "../controllers/todoController.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", addTodos);
router.delete("/", deleteTodos);
// router.post("/", addTodo);

export default router;
