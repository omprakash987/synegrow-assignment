"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodoById = exports.getTodo = exports.createTodo = void 0;
const index_1 = require("../models/index");
const todoValidator_1 = require("../validator/todoValidator");
``;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, status } = req.body;
        const { data, error } = todoValidator_1.todoValidatorSchema.safeParse(req.body);
        if (error) {
            console.log("error : ", error);
        }
        if (!title || !description) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const todo = yield index_1.Task.create({ title, description, status });
        return res.status(201).json({
            message: "Todo created",
            todo,
        });
    }
    catch (error) {
        console.error("Error in createTodo:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createTodo = createTodo;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield index_1.Task.findAll();
        if (todos.length === 0) {
            return res.status(404).json({ message: "No todos found" });
        }
        return res.status(200).json({
            message: "Todos fetched successfully",
            todos,
        });
    }
    catch (error) {
        console.error("Error in getTodo:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getTodo = getTodo;
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield index_1.Task.findByPk(id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.status(200).json({
            message: "Todo fetched successfully",
            todo,
        });
    }
    catch (error) {
        console.error("Error in getTodoById:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getTodoById = getTodoById;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const { data, error } = todoValidator_1.todoValidatorSchema.safeParse(req.body);
        if (error) {
            console.log('error : ', error);
        }
        const todo = yield index_1.Task.findByPk(id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        if (title === undefined && description === undefined && status === undefined) {
            return res.status(400).json({ message: "Nothing to update" });
        }
        const updatedTodo = yield todo.update(Object.assign(Object.assign(Object.assign({}, (title !== undefined && { title })), (description !== undefined && { description })), (status !== undefined && { status })));
        return res.status(200).json({
            message: "Todo updated successfully",
            todo: updatedTodo,
        });
    }
    catch (error) {
        console.error("Error in updateTodo:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield index_1.Task.findByPk(id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        yield index_1.Task.destroy({ where: { id }, force: true });
        return res.status(200).json({ message: "Todo deleted successfully" });
    }
    catch (error) {
        console.error("Error in deleteTodo:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteTodo = deleteTodo;
