import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import fileUpload from "express-fileupload";

// database connection
import { connection } from "./database/connection.js";

// import routes
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import { newsLetterCron } from "./automation/newsLetterCron.js";

const app = express();
config({ path: "./config/config.env" });

// Default Middlewares
app.use(
  cors({
    // origin: [process.env.FRONTEND_URL],
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// default test route
app.get("/", (_req, res) => {
  res.send("MERN Job Portal with Automation (automation using node-cron)");
});

// using Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

newsLetterCron();
connection();
app.use(errorMiddleware);

export default app;
