import express from "express";
import { getTodos } from "../controllers/todoController.js";

const router = express.Router();

router.get("/", getTodos);
// router.post("/", addTodo);

export default router;
