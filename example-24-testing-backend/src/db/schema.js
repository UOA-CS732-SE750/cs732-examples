import mongoose from "mongoose";
const Schema = mongoose.Schema;

const breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, "Too few eggs"],
    max: 12
  },
  bacon: {
    type: Number,
    required: [true, "Why no bacon?"]
  },
  drink: {
    type: String,
    enum: ["Coffee", "Tea"],
    required: function () {
      return this.bacon > 3;
    }
  }
});

export const Breakfast = mongoose.model("Breakfast", breakfastSchema);
