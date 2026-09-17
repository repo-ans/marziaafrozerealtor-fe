import Link from "next/link";
import Image from "next/image";
import { BedDouble, Bath, Ruler } from "lucide-react";
import type { IProperty } from "@/types/property";

function formatPrice(price?: number | null) {
  if (!price) return "Price on request";
  return `$${price.toLocaleString("en-CA")}`;
}

export default function PropertyCard({ property }: { property: IProperty }) {
  const image = property.images[0] || "https://placehold.co/800x600?text=No+Image";

  return (
    <div className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream">
        <Image
          src={image}
          alt={property.UnparsedAddress || "Property"}
          fill
          unoptimized
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-accent-green px-3 py-1 text-xs font-semibold text-white">
          {property.MlsStatus === "Active" ? "For Sale" : property.MlsStatus}
        </span>
      </div>

      <div className="space-y-3 p-5">
        <p className="text-lg font-bold text-plum-800">{formatPrice(property.ListPrice)}</p>
        <p className="line-clamp-1 text-sm font-medium text-ink">
          {property.UnparsedAddress || `${property.City ?? ""}, ${property.StateOrProvince ?? ""}`}
        </p>

        <div className="flex items-center gap-4 text-xs text-ink-soft">
          <span className="flex items-center gap-1">
            <BedDouble size={14} /> {property.BedroomsTotal ?? "-"} Bed
          </span>
          <span className="flex items-center gap-1">
            <Bath size={14} /> {property.BathroomsTotalInteger ?? "-"} Bath
          </span>
          <span className="flex items-center gap-1">
            <Ruler size={14} /> {property.BuildingAreaTotal ? `${property.BuildingAreaTotal} sqft` : "-"}
          </span>
        </div>

        <Link
          href={`/property/${property.ListingKey}`}
          className="block w-full rounded-full bg-plum-800 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-plum-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
