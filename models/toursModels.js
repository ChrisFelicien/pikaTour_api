import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [50, "Tour name must contains not more than 50 characters"],
    minlength: [5, "Tour name must have at least 5 characters"],
    required: [true, "Tour must have a title"],
    unique: [true, "This name is already used"],
  },
  startDates: {
    type: [Date],
    required: [true, "Tour must have a starting date"],
  },
  price: {
    type: Number,
    required: [true, "Tour must have a price"],
  },
});

export default mongoose.model("TourModel", tourSchema);
