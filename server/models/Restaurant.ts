import { Schema } from "mongoose";

const mongoose = require("mongoose");

const restaurantSchema = new Schema({
  name: String,
  slug: String,
  rating: Number,
  favorite: Boolean,
  image: String,
  deliveryTime: String,
});

export default mongoose.model("Restaurant", restaurantSchema);
