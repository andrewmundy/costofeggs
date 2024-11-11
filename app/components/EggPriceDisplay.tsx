"use client";

import { EggPrice } from "../lib/types";
import { Egg } from "lucide-react";
import { formatCurrency } from "../lib/utils";
import { EggAPIEntry, Entry } from "../types";
import { late } from "zod";

interface EggPriceDisplayProps {
  eggPrices?: {
    latestEntry: EggAPIEntry | null;
    peggedEntry: EggAPIEntry | null;
  } | null;
  entries: Entry[];
}

export default function EggPriceDisplay({
  eggPrices,
  entries,
}: EggPriceDisplayProps) {
  const { latestEntry, peggedEntry } = eggPrices ?? {};

  const latestPrice = formatCurrency(latestEntry?.value ?? 0);
  const peggedPrice = formatCurrency(peggedEntry?.value ?? 0);
  const latestDate = `${latestEntry?.periodName} ${latestEntry?.year}`;
  const peggedDate = `${peggedEntry?.periodName} ${peggedEntry?.year}`;
  const calculatePriceDifference =
    (latestEntry?.value ?? 0) - (peggedEntry?.value ?? 0);
  const realCostOfEggs = (latestEntry?.value ?? 0) - calculatePriceDifference;
  const calculateRealCost = () => {
    const totalCostFromAllEntries = entries.reduce((acc, entry) => {
      if (!entry.shouldCalculatePrice || !entry.active) return acc;
      return acc + Number(entry?.price);
    }, 0);

    const totalCost = realCostOfEggs + totalCostFromAllEntries;
    return formatCurrency(totalCost);
  };

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 py-4 px-6 rounded-md space-y-5">
      <div className="flex flex-col ">
        <p className="text-gray-500">True cost of eggs today</p>
        <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
          🥚 {calculateRealCost()}
        </p>
      </div>
      <div>
        <div className="space-y-5">
          <div className="space-y-1">
            <p className="text-3l font-bold text-yellow-600 dark:text-yellow-400">
              {latestPrice}
            </p>
            <i className="text-sm text-gray-500 dark:text-gray-300">
              {latestDate}
            </i>
          </div>

          <div className="space-y-1">
            <p className="text-3l font-bold text-yellow-600 dark:text-yellow-400">
              {peggedPrice}
            </p>
            <i className="text-sm text-gray-500 dark:text-gray-300">
              {peggedDate} - Trump declared winner
            </i>
          </div>

          <div className="space-y-1">
            <p className="text-3l font-bold text-yellow-600 dark:text-yellow-400">
              {formatCurrency(calculatePriceDifference)}
            </p>
            <i className="text-sm text-gray-500 dark:text-gray-300">
              Amount saved because of Trump
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}
