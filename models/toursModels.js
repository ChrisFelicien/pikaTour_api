import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [20, "Tour name must contains not more than 50 characters"],
    minlength: [5, "Tour name must have at least 5 characters"],
    required: [true, "Tour must have a title"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  price: {
    type: Number,
    required: [true, "Tour must have a price"],
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "marcos", "caressa"],
      message: "{VALUE} is unknown company",
    },
    required: [true, "Please provide a company name"],
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [4, "The min of rating is 4"],
    // max: [5.0, "Max rating is 4.0"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Products", tourSchema);
