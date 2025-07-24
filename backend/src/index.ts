
import express   from "express";
import connectToDB from "./lib/ConnectToDB";
import todoRoute from './routes/route.todo'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const PORT: number = 3000;
const app = express();

app.use(cors()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", todoRoute);

app.listen(PORT, async () => {
  try {
    await connectToDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.error("🔴 Failed to connect to database:", err);
    process.exit(1);
  }
});
