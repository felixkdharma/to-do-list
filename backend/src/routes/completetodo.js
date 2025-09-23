import express from "express";
import { getCompleteTodos } from "../controllers/completeTodoController.js";

const router = express.Router();

router.get("/", getCompleteTodos);
// router.post("/", addTodo);

export default router;
