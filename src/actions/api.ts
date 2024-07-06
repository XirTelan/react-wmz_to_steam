"use server";

import { addTodayRates, getTodayRates } from "@/services/rates";

export const getExchangeRate = async () => {
  try {
    let res = await getTodayRates();
    if (!res) {
      res = await updateRates();
    }
    return res?.rates;
  } catch (error) {
    console.error(error);
    throw new Error("getExchangeRate error");
  }
};

export const updateRates = async () => {
  try {
    const res = await fetch(
      `https://api.currencybeacon.com/v1/latest?api_key=${process.env.CURRENCY_API}&base=USD&symbols=RUB,KZT`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const newRates = await addTodayRates(data);
    if (!newRates) throw new Error("getExchangeRate error");
    return newRates;
  } catch (error) {
    console.error(error);
    throw new Error("updateRates error");
  }
};

export const getSteamHelperRate = async () => {

};


