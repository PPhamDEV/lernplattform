import express from "express";
import cors from "cors";
import lessonsRoutes from "./modules/lessons/lessons.routes";
import coursesRoutes from "./modules/courses/courses.routes";
import modulesRoutes from "./modules/modules/modules.routes";
import vocabularyRoutes from "./modules/vocabulary/vocabulary.routes";
import path from "path";
import exercisesRoutes from "./modules/exercises/exercises.routes";
import exerciseOptionsRoutes from "./modules/exercisesOptions/exercisesOptions.routes";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import userRoutes from "./modules/user/user.routes";

dotenv.config();

const app = express();
app.use("/assets", express.static(path.join(__dirname, "../assets")));

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "http://localhost:4242",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/assets", express.static(path.join(__dirname, "../assets")));
app.use("/api/users", userRoutes);

app.get("/", (_, res) => {
  res.json({
    message: "GermanGains API is running",
    version: "1.0.0",
    routes: [
      "/",
      "/health",
      "/test-db",
      "/api/users/register",
      "/api/users/login",
      "/api/users/me",
      "/api/users/progress",
    ],
  });
});

app.get("/health", (_, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.get("/test-db", async (_, res) => {
  try {
    const { default: prisma } = await import("./lib/prisma");
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "Database connected" });
  } catch (err: any) {
    res
      .status(500)
      .json({ status: "DB connection failed", error: err.message });
  }
});
//Routes
app.use("/api/lesson", lessonsRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/modules", modulesRoutes);
app.use("/api/vocabulary", vocabularyRoutes);
app.use("/api/exercises", exercisesRoutes);
app.use("/api/exercise-options", exerciseOptionsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running successfully on http://localhost:${PORT}`);
});
