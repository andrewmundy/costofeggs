export interface Entry {
  title?: string;
  href?: string;
  article?: string;
  image?: string;
  body?: any;
  price?: number;
  publishedAt?: string;
  updatedAt?: string;
  priceCalculation?: string;
  active?: boolean;
  shouldCalculatePrice?: boolean;
}

export interface EggPrice {
  price: number;
  currency: string;
  date: Date;
}
