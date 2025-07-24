
import sequelize from "../db/db"

 
const connectToDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");
  } catch (error) {
    console.error("🔴 Error connecting to the database:", error as Error);
    process.exit(1);
  }
};

export default connectToDB;
