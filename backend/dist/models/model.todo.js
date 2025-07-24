"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
exports.initTaskModel = initTaskModel;
const sequelize_1 = require("sequelize");
class Task extends sequelize_1.Model {
}
exports.Task = Task;
function initTaskModel(sequelize) {
    Task.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM("PENDING", "COMPLETED", "IN_PROGRESS"),
            allowNull: false,
            defaultValue: "PENDING",
        },
    }, {
        sequelize,
        modelName: "Task",
        tableName: "tasks",
        timestamps: true,
    });
    return Task;
}
