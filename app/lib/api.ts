import { Entry, GetEggPriceApiResponse, EggAPIEntry } from "../types";
import { client } from "./sanity";

const EGG_PRICE_API = `https://api.bls.gov/publicAPI/v2/timeseries/data/APU0000708111`;

export async function getEntries(): Promise<Entry[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error("Sanity project ID is not configured");
    return [];
  }

  try {
    const entries = await client.fetch<
      Entry[]
    >(`*[_type == "articleEntry"] | order(_createdAt desc) {
      "id": _id, "title": title, "article": article, "publishedAt": publishedAt, "image": image.asset->url, "body": body, "price": price, "updatedAt": _updatedAt, "priceCalculation": priceCalculation, "active": active, "shouldCalculatePrice": shouldCalculatePrice
    }`);
    return entries;
  } catch (error) {
    console.error("Error fetching entries:", error);
    return [];
  }
}

export async function getEggPrice(): Promise<GetEggPriceApiResponse | null> {
  try {
    const response = await fetch(EGG_PRICE_API, {
      next: { revalidate: 3600 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch egg price: ${response.statusText}`);
    }

    const data = await response.json();
    const latestEntry = data.Results.series[0].data[0];
    const peggedEntry = data.Results.series[0].data.find(
      (entry: EggAPIEntry) =>
        entry.year === "2024" && entry.periodName === "September"
    );

    return {
      latestEntry: {
        ...latestEntry,
        value: Number(latestEntry.value),
        title: "Latest",
      },
      peggedEntry: {
        ...peggedEntry,
        value: Number(peggedEntry.value),
        title: "End of Biden's Term",
      },
    };
  } catch (error) {
    console.error("Error fetching egg price:", error);
    return null;
  }
}
