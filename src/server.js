import express from "express";
import userRoutes from "./routes/users.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use(cors);
app.use(morgan);
app.use(helmet);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor runing on port ${PORT}`);
});

export default app;
