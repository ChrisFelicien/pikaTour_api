import ToursModels from "../models/toursModels.js";

const asyncHandler = (fn) => {
  return (req, res, next) => fn(req, res, next).catch(next);
};

const getAllTours = asyncHandler(async (req, res, next) => {
  const tours = await ToursModels.find();

  res.status(200).json({
    status: "Success",
    result: tours.length,
    tours,
  });
});

const createTour = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const tour = await ToursModels.create(req.body);

  res.status(201).json({
    status: "Success",
    tour,
  });
});

const getSingleTour = asyncHandler(async (req, res, next) => {
  const tour = await ToursModels.findById(req.params.id);

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

  res.status(200).json({
    status: "success",
    tour,
  });
});

const deleteTour = async (req, res, next) => {
  const tour = await ToursModels.findByIdAndDelete(req.params.id);

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
