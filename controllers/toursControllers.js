import ToursModels from "../models/toursModels.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createErrorMessage } from "../utils/CustomErrorMessage.js";

const getAllTours = asyncHandler(async (req, res, next) => {
  const { featured, select, company, name, sort, digitFiltering } = req.query;
  const queyObject = {};

  if (featured) {
    queyObject.featured = featured === "true" ? true : false;
  }

  if (digitFiltering) {
    // find({price: {$gt: 30}, rating: {$eq: 4.1}})
    const operators = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };

    const regex = /\b(<|<=|>|>=|=)\b/g;

    //remplace all operators
    let filters = digitFiltering.replace(
      regex,
      (match) => `-${operators[match]}-`
    );

    const options = ["rating", "price"];

    filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      queyObject[field] = { [operator]: value };
    });
  }

  if (company) {
    queyObject.company = company;
  }

  if (name) {
    queyObject.name = { $regex: `^${name}`, $options: "i" };
  }

  let tempTours = ToursModels.find(queyObject);

  if (sort) {
    const querySort = sort.split(",").join(" ");
    tempTours = tempTours.sort(querySort);
  } else {
    tempTours = tempTours.sort(`createdAt`);
  }

  if (select) {
    const selectedFields = select.split(",").join(" ");
    tempTours = tempTours.select(selectedFields);
  }

  const limit = req.query.limit * 1 || 10;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;

  tempTours = tempTours.skip(skip).limit(limit);

  const tours = await tempTours;

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
