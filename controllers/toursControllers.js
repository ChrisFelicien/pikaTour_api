import ToursModels from "../models/toursModels.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createErrorMessage } from "../utils/CustomErrorMessage.js";

const getAllTours = asyncHandler(async (req, res, next) => {
  const tours = await ToursModels.find();

  res.status(200).json({
    status: "Success",
    result: tours.length,
    tours,
  });
});

const createTour = asyncHandler(async (req, res, next) => {
  const tour = await ToursModels.create(req.body);

  res.status(201).json({
    status: "Success",
    tour,
  });
});

const getSingleTour = asyncHandler(async (req, res, next) => {
  const tour = await ToursModels.findById(req.params.id);

  if (!tour) {
    return next(createErrorMessage("There is not a tour with this ID", 404));
  }

  res.status(200).json({
    status: "success",
    tour,
  });
});

const updateTour = asyncHandler(async (req, res, next) => {
  const tour = await ToursModels.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    return next(createErrorMessage("There is not a tour with this ID", 404));
  }

  res.status(200).json({
    status: "success",
    tour,
  });
});

const deleteTour = async (req, res, next) => {
  const tour = await ToursModels.findByIdAndDelete(req.params.id);

  if (!tour) {
    return next(createErrorMessage("There is not a tour with this ID", 404));
  }

  res.status(200).json({
    tour: null,
  });
};

export default {
  getAllTours,
  createTour,
  deleteTour,
  updateTour,
  getSingleTour,
};
