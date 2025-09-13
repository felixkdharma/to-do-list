import express from "express";
import { getTodos, addTodos } from "../controllers/todoController.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", addTodos);
// router.post("/", addTodo);

export default router;
