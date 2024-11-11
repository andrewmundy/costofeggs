"use client";

import { Entry } from "../lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "../lib/utils";
import Image from "next/image";

interface EntryListProps {
  entries: Entry[];
}

export default function EntryList({ entries }: EntryListProps) {
  return (
    <div className="space-y-5">
      {entries.map(
        ({
          id,
          title,
          article,
          image,
          body,
          price,
          publishedAt,
          priceCalculation,
          active = true,
          shouldCalculatePrice = true,
        }) => (
          <Card key={id} className="hover:shadow-lg transition-shadow">
            <div className="flex flex-row">
              {image && (
                <div className="flex justify-center items-center p-4">
                  <Image width={150} height={150} src={image} alt={title} />
                </div>
              )}

              <div className="p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {new Date(publishedAt).toLocaleDateString()}
                </p>
                <div className="flex-col">
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {shouldCalculatePrice
                      ? `-${formatCurrency(price)}`
                      : "Incalculable"}
                  </p>
                  {priceCalculation && (
                    <i className="text-sm text-gray-400 dark:text-gray-300">
                      {priceCalculation}
                    </i>
                  )}
                </div>

                <CardTitle className="text-lg">{title}</CardTitle>
                <a
                  href={article}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {article}
                </a>
              </div>
            </div>
          </Card>
        )
      )}
    </div>
  );
}
