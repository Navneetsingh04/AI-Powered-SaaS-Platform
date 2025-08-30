import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";

dotenv.config();

// Routes
import aiRouter from "./routes/ai.routes.js";
import userRouter from "./routes/user.routes.js";
import connectCloudinary from "./config/Cloudinary.js";

const app = express();
await connectCloudinary()

// Middlewares

app.use(express.json());
app.use(clerkMiddleware());
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" 
      ? process.env.CORS_ORIGIN 
      : "http://localhost:5173",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.use(requireAuth());
app.use('/api/ai', aiRouter);
app.use('/api/user',userRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
