import { Request, Response } from "express";
import { Task } from "../models/index"; 
import { todoValidatorSchema } from "../validator/todoValidator";
type Status = "PENDING" | "COMPLETED" | "IN_PROGRESS";

interface CreateTodoDto {
  title: string;
  description: string;
  status: Status;
}

interface UpdateTodoDto {
  title?: string;
  description?: string;
  status?: Status;
}
``
export const createTodo = async (
  req: Request<{}, {}, CreateTodoDto>,
  res: Response
): Promise<Response> => {
  try {
    const { title, description, status } = req.body;

    const{data,error} = todoValidatorSchema.safeParse(req.body); 

    if(error){
      console.log("error : ", error); 
    }

    if (!title || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const todo = await Task.create({ title, description, status });

    return res.status(201).json({
      message: "Todo created",
      todo,
    });
  } catch (error) {
    console.error("Error in createTodo:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const todos = await Task.findAll();

    if (todos.length === 0) {
      return res.status(404).json({ message: "No todos found" });
    }

    return res.status(200).json({
      message: "Todos fetched successfully",
      todos,
    });
  } catch (error) {
    console.error("Error in getTodo:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTodoById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const todo = await Task.findByPk(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({
      message: "Todo fetched successfully",
      todo,
    });
  } catch (error) {
    console.error("Error in getTodoById:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTodo = async (
  req: Request<{ id: string }, {}, UpdateTodoDto>,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const {data,error} = todoValidatorSchema.safeParse(req.body); 

    if(error){
      console.log('error : ', error); 
    }

    const todo = await Task.findByPk(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (title === undefined && description === undefined && status === undefined) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const updatedTodo = await todo.update({
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(status !== undefined && { status }),
    });

    return res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    console.error("Error in updateTodo:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTodo = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const todo = await Task.findByPk(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await Task.destroy({ where: { id }, force: true });

    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTodo:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
