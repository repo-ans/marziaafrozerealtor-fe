"use client";

import Link from "next/link";
import Image from "next/image";
import { BedDouble, Bath, Maximize2, ArrowRight, Clock, Heart, CameraOff } from "lucide-react";
import type { IProperty } from "@/types/property";
import { formatPrice, formatAddedAgo, statusBadgeColor } from "@/lib/listingFormat";
import { useFavorite } from "@/hooks/useFavorite";

function hasRealImage(url?: string) {
  return !!url && !url.includes("placehold.co");
}

export default function PropertyCard({
  property,
  dark = false,
}: {
  property: IProperty;
  dark?: boolean;
}) {
  const { saved, toggle } = useFavorite(property.ListingKey);
  const image = property.images[0];
  const showImage = hasRealImage(image);
  const addedLabel = formatAddedAgo(
    property.OriginalEntryTimestamp ?? property.ListingContractDate
  );
  const tag = property.PropertySubType || property.PropertyType || "Listing";

  if (!dark) {
    return (
      <div className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:shadow-lg">
        <Link href={`/property/${property.ListingKey}`} className="block">
          <div className="relative aspect-4/3 w-full overflow-hidden bg-cream">
            {showImage ? (
              <Image
                src={image}
                alt={property.UnparsedAddress || "Property"}
                fill
                unoptimized
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-soft/50">
                <CameraOff size={28} strokeWidth={1.5} />
                <span className="text-xs font-medium">Photos Coming Soon</span>
              </div>
            )}
            <span
              className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white ${statusBadgeColor(
                property.MlsStatus
              )}`}
            >
              {property.MlsStatus || tag}
            </span>
          </div>

          <div className="space-y-3 p-5">
            <p className="text-lg font-bold text-plum-800">
              {formatPrice(property.ListPrice, property.TransactionType)}
            </p>
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
                <Maximize2 size={14} />{" "}
                {property.BuildingAreaTotal ? `${property.BuildingAreaTotal} sqft` : "-"}
              </span>
            </div>

            <div className="block w-full rounded-full bg-plum-800 py-2.5 text-center text-sm font-semibold text-white transition group-hover:bg-plum-700">
              View Details
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // Dark variant — used inside dark-background sections (Featured Row on
  // the homepage), matching Dream Valley Realty's own featured card style.
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-plum-900 transition-all duration-300 hover:-translate-y-1.5 hover:border-plum-500/35 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <Link href={`/property/${property.ListingKey}`} className="flex flex-1 flex-col">
        <div className="relative h-52 overflow-hidden bg-plum-950">
          {showImage ? (
            <Image
              src={image}
              alt={property.UnparsedAddress || "Property"}
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40">
              <CameraOff size={36} strokeWidth={1.5} />
              <span className="mt-2 text-xs font-medium">Photos Coming Soon</span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-900 via-black/20 to-transparent" />

          {addedLabel ? (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-accent-green px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
              <Clock size={12} /> Added: {addedLabel}
            </span>
          ) : (
            <span className="absolute left-3 top-3 rounded-full bg-plum-600 px-3 py-1 text-xs font-bold text-white">
              {tag}
            </span>
          )}

          {property.MlsStatus && (
            <span
              className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold text-white ${statusBadgeColor(
                property.MlsStatus
              )}`}
            >
              {property.MlsStatus}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="mb-1 text-2xl font-bold text-plum-300">
            {formatPrice(property.ListPrice, property.TransactionType)}
          </p>
          <h3 className="mb-0.5 line-clamp-1 text-base font-semibold text-white transition-colors group-hover:text-plum-300">
            {property.UnparsedAddress || "Address not available"}
          </h3>
          <p className="mb-4 text-sm text-white/40">{property.City ?? ""}</p>

          <div className="mb-4 flex items-center gap-4 border-t border-white/8 py-3">
            <span className="flex items-center gap-1.5 text-xs text-white/55">
              <BedDouble size={14} className="text-plum-400" />
              {property.BedroomsTotal ?? "-"} Bed
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/55">
              <Bath size={14} className="text-plum-400" />
              {property.BathroomsTotalInteger ?? "-"} Bath
            </span>
            {property.BuildingAreaTotal ? (
              <span className="flex items-center gap-1.5 text-xs text-white/55">
                <Maximize2 size={14} className="text-plum-400" />
                {Math.round(property.BuildingAreaTotal).toLocaleString()} ft²
              </span>
            ) : null}
          </div>

          <span className="mt-auto flex items-center gap-2 text-sm font-semibold text-plum-300 transition-all duration-200 group-hover:gap-3 group-hover:text-white">
            View Details <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>

      <button
        onClick={toggle}
        aria-label={saved ? "Remove from saved" : "Save listing"}
        className="absolute right-3 top-44 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
      >
        <Heart size={15} className={saved ? "fill-plum-400 text-plum-400" : ""} />
      </button>
    </div>
  );
}
