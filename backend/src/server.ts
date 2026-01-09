import express, { Application, Response, Request } from "express";
import notesRoutes from "./routes/notesRoutes";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "8080")

app.use(cors({
  origin: "http://localhost:5173"
}))
app.use(express.json());
app.use("/api/notes", notesRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Welcome to the Notes API",
    version: "1.0.0",
    endpoints: "/api/notes"
  })
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
  });
});
