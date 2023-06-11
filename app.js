import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import toursRoutes from "./routes/toursRoutes.js";
import connectDB from "./utils/mongoConnect.js";
import notFound from "./controllers/404.js";
import defaultError from "./utils/defaultExpressError.js";

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

// Routes
app.use("/api/v1/tours", toursRoutes);
app.all("*", notFound);
app.use(defaultError);

// server
const port = process.env.PORT || 3000;

connectDB();
app.listen(port, () => console.log(`Server is running on port ${port}`));
