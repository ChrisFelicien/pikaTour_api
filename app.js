import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import toursRoutes from "./routes/toursRoutes.js";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.static("public"));

app.use("/api/v1/tours", toursRoutes);

// server
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
