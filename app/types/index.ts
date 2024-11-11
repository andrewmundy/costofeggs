export interface Entry {
  title?: string;
  href?: string;
  price?: number;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  active?: boolean;
  shouldCalculatePrice?: boolean;
  article?: string;
  image?: string;
  body?: any;
  priceCalculation?: string;
}

export interface EggPrice {
  date: string;
  price: number;
  currency: string;
}

export interface EggAPIEntry {
  year: string;
  period: string;
  periodName: string;
  latest: string;
  value: number;
  title: string;
  footnotes: string[];
}

export interface GetEggPriceApiResponse {
  latestEntry: EggAPIEntry;
  peggedEntry: EggAPIEntry;
}
