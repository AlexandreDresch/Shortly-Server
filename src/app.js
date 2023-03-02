import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import urlsRouter from "./routes/urlsRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use([authRouter, userRouter, urlsRouter]);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});