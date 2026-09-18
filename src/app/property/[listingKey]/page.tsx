import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BedDouble,
  Bath,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Database,
  Landmark,
  Lock,
  ChevronRight,
} from "lucide-react";
import { fetchPropertyByKey } from "@/lib/ampre";
import { siteConfig } from "@/config/site";
import Reveal from "@/components/motion/Reveal";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyInquiryForm from "@/components/property/PropertyInquiryForm";

function formatPrice(price?: number | null, transactionType?: string | null) {
  if (!price) return "Price on request";
  const suffix = transactionType === "For Lease" ? "/mo" : "";
  return `$${price.toLocaleString("en-CA")}${suffix}`;
}

function formatDate(value?: string | null) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function isNewListing(value?: string | null) {
  if (!value) return false;
  const days = (Date.now() - new Date(value).getTime()) / 86_400_000;
  return days <= 14;
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ listingKey: string }>;
}) {
  const { listingKey } = await params;
  const property = await fetchPropertyByKey(listingKey);
  if (!property) notFound();

  const architecturalStyle = Array.isArray(property.ArchitecturalStyle)
    ? property.ArchitecturalStyle.join(", ")
    : property.ArchitecturalStyle;

  const mlsRef = property.ListingId ?? property.ListingKey;
  const defaultMessage = `I'm interested in ${property.UnparsedAddress} (MLS® #${mlsRef})...`;

  return (
    <div className="bg-cream pb-20 pt-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <PropertyGallery
            images={property.images}
            alt={property.UnparsedAddress || "Property"}
          />
        </Reveal>

        <nav className="mt-6 flex items-center gap-1.5 text-sm text-ink-soft">
          <Link href="/" className="hover:text-plum-700">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="line-clamp-1 text-ink">{property.UnparsedAddress}</span>
        </nav>

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex flex-wrap gap-2">
              {isNewListing(property.ListingContractDate) && (
                <span className="rounded-full bg-accent-green px-3 py-1 text-xs font-semibold text-white">
                  New
                </span>
              )}
              {property.PropertySubType && (
                <span className="rounded-full bg-plum-800/10 px-3 py-1 text-xs font-semibold text-plum-800">
                  {property.PropertySubType}
                </span>
              )}
            </div>

            <h1 className="mt-3 text-2xl font-bold text-ink sm:text-3xl">
              {property.UnparsedAddress}
              {property.CityRegion && (
                <span className="font-normal text-ink-soft">, {property.CityRegion}</span>
              )}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
              <MapPin size={14} /> {property.City}, {property.StateOrProvince}
            </p>

            <h2 className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-plum-600">
              Listing Summary
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-4 rounded-2xl border border-black/10 bg-white p-6 text-sm sm:grid-cols-3">
              <Detail label="MLS®#" value={mlsRef} />
              <Detail label="Type" value={property.PropertySubType ?? property.PropertyType ?? "-"} />
              <Detail label="Home Style" value={architecturalStyle ?? "-"} />
              <Detail label="Board" value="TRREB" />
              <Detail label="Status" value={property.MlsStatus ?? "-"} />
              <Detail label="Transaction" value={property.TransactionType ?? "-"} />
            </div>

            <h2 className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-plum-600">
              Description
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              {property.PublicRemarks || "No description provided for this listing."}
            </p>

            <h2 className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-plum-600">
              Property
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-4 rounded-2xl border border-black/10 bg-white p-6 text-sm sm:grid-cols-3">
              <Detail label="Property Type" value={property.PropertyType ?? "-"} />
              <Detail label="Status" value={property.MlsStatus ?? "-"} />
              <Detail label="Building Type" value={property.PropertySubType ?? "-"} />
              <Detail label="Year Built" value={property.YearBuilt ?? "-"} />
              <Detail label="Parking" value={property.ParkingTotal ?? "-"} />
              <Detail label="Area" value={property.City ?? "-"} />
            </div>

            <h2 className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-plum-600">
              Listing History
            </h2>
            <div className="relative mt-3 overflow-hidden rounded-2xl border border-black/10 bg-white p-6">
              <div className="space-y-3 blur-sm select-none" aria-hidden>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between text-sm text-ink-soft">
                    <span>••• •• ••••</span>
                    <span>$•••,•••</span>
                    <span>••••••</span>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/70 text-center">
                <Lock size={20} className="text-plum-700" />
                <p className="text-sm font-semibold text-ink">
                  Full listing history available on request
                </p>
                <p className="max-w-xs text-xs text-ink-soft">
                  Ask Marzia for the complete price and status history on this address.
                </p>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(
                    `Hi Marzia, can you share the listing history for ${property.UnparsedAddress}?`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-plum-800 px-4 py-2 text-xs font-semibold text-white transition hover:bg-plum-700"
                >
                  Ask Marzia
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-black/10 pt-5 text-xs text-ink-soft">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> Listed {formatDate(property.ListingContractDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <Database size={14} /> Source: IDX
              </span>
              <span className="flex items-center gap-1.5">
                <Landmark size={14} /> Board: TRREB
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="h-fit space-y-5 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-2xl font-bold text-plum-800">
                {formatPrice(property.ListPrice, property.TransactionType)}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{property.UnparsedAddress}</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-cream p-3 text-center">
                  <BedDouble size={18} className="mx-auto text-plum-600" />
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {property.BedroomsTotal ?? "-"}
                  </p>
                  <p className="text-xs text-ink-soft">Beds</p>
                </div>
                <div className="rounded-xl bg-cream p-3 text-center">
                  <Bath size={18} className="mx-auto text-plum-600" />
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {property.BathroomsTotalInteger ?? "-"}
                  </p>
                  <p className="text-xs text-ink-soft">Baths</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-base font-semibold text-ink">{siteConfig.agentName}</p>
              <p className="text-sm text-plum-600">{siteConfig.agentTitle}</p>
              <p className="mt-1 text-xs text-ink-soft">{siteConfig.brokerage}</p>

              <div className="mt-4 space-y-2 text-sm">
                <a
                  href={`tel:${siteConfig.phoneDigits}`}
                  className="flex items-center gap-2 text-ink hover:text-plum-700"
                >
                  <Phone size={15} /> {siteConfig.phoneDisplay}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-ink hover:text-plum-700"
                >
                  <Mail size={15} /> {siteConfig.email}
                </a>
              </div>

              <p className="mt-5 mb-2 text-sm font-semibold text-ink">Ask about this property</p>
              <PropertyInquiryForm defaultMessage={defaultMessage} />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-ink-soft/70">{label}</dt>
      <dd className="mt-0.5 font-medium text-ink">{value}</dd>
    </div>
  );
}
