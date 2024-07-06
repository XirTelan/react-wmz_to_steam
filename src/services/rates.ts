"use server";

import dbConnect from "@/lib/dbConnect";
import Rate from "@/models/Rate";
import { RatesData } from "../../types";

export const getTodayRates = async (): Promise<Pick<
  RatesData,
  "rates"
> | null> => {
  const today = new Date().toISOString().split("T")[0];
  await dbConnect();
  const rates = await Rate.findOne({ date: today }).select("-_id").lean();
  return rates;
};

export const addTodayRates = async (data: RatesData) => {
  await dbConnect();
  const rate = {
    date: data.date.split("T")[0],
    base: data.base,
    rates: data.rates,
  };
  const result = await Rate.create(rate);
  return result;
};
