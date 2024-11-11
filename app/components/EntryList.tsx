"use client";

import { Entry } from "../lib/types";
import { formatCurrency } from "../lib/utils";
import Image from "next/image";

interface EntryListProps {
  entries: Entry[];
}

export default function EntryList({ entries }: EntryListProps) {
  return (
    <div className="space-y-5">
      {entries.map(
        (
          {
            title,
            article,
            image,
            body,
            price,
            publishedAt,
            priceCalculation,
            active = true,
            shouldCalculatePrice = true,
          },
          i
        ) => (
          <div key={i} className="rounded-md border-gray-200 border">
            <div className="flex flex-row">
              {image && (
                <div
                  className="relative rounded-lt-md rounded-tr-md"
                  style={{ height: "auto", minWidth: 200 }}
                >
                  <Image
                    fill={true}
                    style={{
                      borderRadius: "0.375rem 0 0 0.375rem",
                    }}
                    src={image}
                    alt={title ?? ""}
                  />
                </div>
              )}

              <div className="p-4">
                {publishedAt && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(publishedAt).toLocaleDateString()}
                  </p>
                )}
                <div className="flex-col ">
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {shouldCalculatePrice
                      ? `-${formatCurrency(price ?? 0)}`
                      : "Incalculable"}
                  </p>
                  <div>
                    {priceCalculation && (
                      <i className="text-sm text-gray-400 dark:text-gray-300">
                        {priceCalculation}
                      </i>
                    )}
                  </div>
                  <div className="mt-4">
                    <a
                      href={article}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {title}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
