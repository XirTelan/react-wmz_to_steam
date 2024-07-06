export type RatesType = {
  RUB: number;
  KZT: number;
};

export type CountPageProps = {
  curRates: RatesType;
  steamRates: RatesType;
};

export type RatesData = {
  date: string;
  base: string;
  rates: RatesType;
};


export type SteamData = {
  success: boolean;
  data: {
    base: string;
    rates: RatesType;
  };
};