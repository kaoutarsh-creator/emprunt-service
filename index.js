<<<<<<< HEAD
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import empruntRoutes from "./routes/empruntRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Emprunt Service API is running",
  });
});

app.use("/api/v1", authRoutes);
app.use("/api/v1", empruntRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
=======
import express from 'express';
import empruntRoutes from './routes/empruntRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/v1/emprunt', empruntRoutes);

app.listen(3000, () => {
    console.log('Server running...');
>>>>>>> 4e8c288adfbfc0e4d75d72ad0679d672ebe5ce92
});