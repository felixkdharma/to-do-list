import express from "express";
import {
    setCompleteTodos,
    getCompleteTodos
  } from "../controllers/completeTodoController.js";

const router = express.Router();

router.get("/", getCompleteTodos);
router.post("/complete", setCompleteTodos);
// router.post("/", addTodo);

export default router;
