import { Sequelize } from "sequelize";
import { initTaskModel, Task } from "./model.todo";
import dotenv from 'dotenv'; 

dotenv.config(); 

const DB_USER     = process.env.MYSQLUSER;
const DB_PASS     = process.env.MYSQLPASSWORD;
const DB_HOST     = "localhost";
const DB_PORT     = process.env.MYSQLPORT ;
const DB_NAME     = process.env.DB_NAME;

const connectionString = `mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export const sequelize = new Sequelize(connectionString, {
  dialect: "mysql",
  logging: console.log,
});

initTaskModel(sequelize);

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced");
  } catch (err) {
    console.error("🔴 Failed to sync database:", err);
    process.exit(1);
  }
})();

export { Task };
