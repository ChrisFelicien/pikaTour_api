import express from "express";
import toursControllers from "../controllers/toursControllers.js";

const router = express.Router();

router
  .route("/")
  .get(toursControllers.getAllTours)
  .post(toursControllers.createTour);

router
  .route("/:id")
  .get(toursControllers.getSingleTour)
  .patch(toursControllers.updateTour)
  .delete(toursControllers.deleteTour);

export default router;
