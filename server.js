import express, { json } from "express";
// import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import { dirname, join } from "path";
// import { fileURLToPath } from "url";
import router from "./src/routes/index.js";

dotenv.config();

const app = express();

// const corseOptions = { credentials: true, origin: process.env.URL || "*" }

// app.use(cors(corseOptions));
app.use(json());
app.use(cookieParser());

const { userRouter, propertyRouter } = router;

app.use("/api/v1", userRouter);
app.use("/api/v1", propertyRouter);

const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Server is live on PORT ${port}`));
