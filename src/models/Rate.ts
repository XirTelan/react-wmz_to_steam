import mongoose from "mongoose";
import { RatesData } from "../../types";

const RateSchema = new mongoose.Schema<RatesData>(
  {
    date: {
      type: String,
      required: true,
    },
    base: {
      type: String,
      required: true,
    },
    rates: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);
RateSchema.index({ date: 1, base: 1 }, { unique: true });
const Rate: mongoose.Model<RatesData> =
  mongoose.models.Rate || mongoose.model("Rate", RateSchema);

export default Rate;
