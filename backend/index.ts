import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import audioRoutes from "./routes/audio";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", audioRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
