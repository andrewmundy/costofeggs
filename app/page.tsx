import { getEntries, getEggPrice } from "./lib/api";
import EntryList from "./components/EntryList";
import EggPriceDisplay from "./components/EggPriceDisplay";

export default async function Home() {
  const [entries, eggPrice] = await Promise.all([getEntries(), getEggPrice()]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <EggPriceDisplay eggPrices={eggPrice} entries={entries} />
      </div>

      <section>
        {entries.length > 0 ? (
          <EntryList entries={entries} />
        ) : (
          "No entries found."
        )}
      </section>
    </main>
  );
}
