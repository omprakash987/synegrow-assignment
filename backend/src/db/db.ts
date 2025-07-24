import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const DB_NAME = process.env.DB_NAME!
const DB_USER = process.env.MYSQLUSER!;
const DB_PASS = process.env.MYSQLPASSWORD!;

const sequelize: Sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
