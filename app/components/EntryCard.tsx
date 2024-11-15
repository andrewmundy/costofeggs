"use client";

import { Entry } from "../lib/types";
import { ExternalLink } from "lucide-react";
import styles from "../styles/Home.module.scss";

interface EntryCardProps {
  entry: Entry;
}

export default function EntryCard({ entry }: EntryCardProps) {
  const { title, href, price, article, body } = entry;

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p className={styles.price}>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price ?? 0)}
        </p>
        <a
          href={article}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Visit <ExternalLink className="inline-block w-4 h-4 ml-1" />
        </a>
        {body &&
          body?.map((block: { _key: string; children: React.ReactNode }) => (
            <p key={block._key}>{block.children}</p>
          ))}
      </div>
    </div>
  );
}
