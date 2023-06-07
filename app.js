import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import toursRoutes from "./routes/toursRoutes.js";
import connectDB from "./utils/mongoConnect.js";

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

app.use("/api/v1/tours", toursRoutes);

// server
const port = process.env.PORT || 3000;

connectDB();
app.listen(port, () => console.log(`Server is running on port ${port}`));
