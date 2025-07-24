import {  
    Sequelize,  
    DataTypes,  
    Model,  
    Optional  
  } from "sequelize";
  
  
  export interface TaskAttributes {
    id: string;
    title: string;
    description: string;
    status: "PENDING" | "COMPLETED" | "IN_PROGRESS";
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  
  export interface TaskCreationAttributes
    extends Optional<TaskAttributes, "id" | "createdAt" | "updatedAt"> {}
  
  
  export class Task
    extends Model<TaskAttributes, TaskCreationAttributes>
    implements TaskAttributes
  {
    public id!: string;
    public title!: string;
    public description!: string;
    public status!: "PENDING" | "COMPLETED" | "IN_PROGRESS";
  
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  
  export function initTaskModel(sequelize: Sequelize): typeof Task {
    Task.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("PENDING", "COMPLETED", "IN_PROGRESS"),
          allowNull: false,
          defaultValue: "PENDING",
        },
      },
      {
        sequelize,
        modelName: "Task",
        tableName: "tasks",
        timestamps: true,
      }
    );
  
    return Task;
  }
  