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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const model_todo_1 = require("./model.todo");
Object.defineProperty(exports, "Task", { enumerable: true, get: function () { return model_todo_1.Task; } });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_USER = process.env.MYSQLUSER;
const DB_PASS = process.env.MYSQLPASSWORD;
const DB_HOST = "localhost";
const DB_PORT = process.env.MYSQLPORT;
const DB_NAME = process.env.DB_NAME;
const connectionString = `mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
exports.sequelize = new sequelize_1.Sequelize(connectionString, {
    dialect: "mysql",
    logging: console.log,
});
(0, model_todo_1.initTaskModel)(exports.sequelize);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.sequelize.sync({ alter: true });
        console.log("✅ Database synced");
    }
    catch (err) {
        console.error("🔴 Failed to sync database:", err);
        process.exit(1);
    }
}))();
