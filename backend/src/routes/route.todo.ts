import { Router } from "express";
import {
  createTodo,
  getTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} from "../controllers/controller.todo";  

const router: Router = Router();

router.post("/task", createTodo);
router.get("/task", getTodo);
router.get("/task/:id", getTodoById);
router.put("/task/:id", updateTodo);
router.delete("/task/:id", deleteTodo);

export default router;
