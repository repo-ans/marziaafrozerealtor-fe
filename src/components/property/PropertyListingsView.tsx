import Link from "next/link";
import { fetchProperties } from "@/lib/ampre";
import type { PropertyListingType, PropertySource } from "@/types/property";
import PropertyCard from "@/components/property/PropertyCard";
import Pagination from "@/components/property/Pagination";
import SearchBar from "@/components/property/SearchBar";
import Reveal from "@/components/motion/Reveal";

const TYPE_TABS: { label: string; value: PropertyListingType }[] = [
  { label: "All", value: "all" },
  { label: "Residential", value: "residential" },
  { label: "Condo", value: "condo" },
  { label: "Commercial", value: "commercial" },
  { label: "Open Houses", value: "open-houses" },
  { label: "Pre-Construction", value: "pre-construction" },
];

export default async function PropertyListingsView({
  source,
  title,
  basePath,
  searchParams,
}: {
  source: PropertySource;
  title: string;
  basePath: string;
  searchParams: Record<string, string | undefined>;
}) {
  const page = Number(searchParams.page) || 1;
  const pageSize = Number(searchParams.pageSize) || 12;
  const type = (searchParams.type as PropertyListingType) || "all";

  const { items, total, pageSize: usedPageSize } = await fetchProperties({
    source,
    type,
    city: searchParams.city,
    q: searchParams.q,
    page,
    pageSize,
  });

  const totalPages = Math.max(1, Math.ceil(total / usedPageSize));
  const params = new URLSearchParams(
    Object.entries(searchParams).filter(([, v]) => v) as [string, string][]
  );

  return (
    <div className="bg-cream pb-20 pt-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex justify-center">
          <SearchBar action={basePath} />
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-ink">{title}</h1>
          <span className="text-sm text-ink-soft">{total} listings found</span>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {TYPE_TABS.map((tab) => {
            const tabParams = new URLSearchParams(params);
            if (tab.value === "all") tabParams.delete("type");
            else tabParams.set("type", tab.value);
            tabParams.delete("page");
            const active = type === tab.value;
            return (
              <Link
                key={tab.value}
                href={`${basePath}?${tabParams.toString()}`}
                className={`rounded-full border-2 px-4 py-1.5 text-sm font-medium transition ${
                  active
                    ? "border-plum-800 bg-plum-800 text-white"
                    : "border-black/10 text-ink hover:border-plum-800"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {items.length === 0 ? (
          <p className="rounded-xl border border-black/10 bg-white p-10 text-center text-ink-soft">
            No listings match your search right now — try a different city or clear your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((property, i) => (
              <Reveal key={property.ListingKey} delay={0.05 * (i % 4)} y={16}>
                <PropertyCard property={property} />
              </Reveal>
            ))}
          </div>
        )}

        <Pagination
          basePath={basePath}
          searchParams={params}
          page={page}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
