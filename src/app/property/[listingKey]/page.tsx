import Image from "next/image";
import { notFound } from "next/navigation";
import { BedDouble, Bath, Ruler, MapPin, Phone, Mail } from "lucide-react";
import { fetchPropertyByKey } from "@/lib/ampre";
import { siteConfig } from "@/config/site";
import Reveal from "@/components/motion/Reveal";

function formatPrice(price?: number | null) {
  if (!price) return "Price on request";
  return `$${price.toLocaleString("en-CA")}`;
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ listingKey: string }>;
}) {
  const { listingKey } = await params;
  const property = await fetchPropertyByKey(listingKey);
  if (!property) notFound();

  return (
    <div className="bg-cream pb-20 pt-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl bg-plum-900/5">
          <Image
            src={property.images[0] || "https://placehold.co/1200x700?text=No+Image"}
            alt={property.UnparsedAddress || "Property"}
            fill
            unoptimized
            className="object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-accent-green px-3 py-1 text-xs font-semibold text-white">
            {property.MlsStatus === "Active" ? "For Sale" : property.MlsStatus}
          </span>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-3">
          <Reveal delay={0.1} className="lg:col-span-2">
            <p className="text-2xl font-bold text-ink">{property.UnparsedAddress}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
              <MapPin size={14} /> {property.City}, {property.StateOrProvince}
            </p>

            <div className="mt-6 flex flex-wrap gap-6 border-y border-black/10 py-5 text-sm text-ink">
              <span className="flex items-center gap-2">
                <BedDouble size={18} className="text-plum-600" />
                {property.BedroomsTotal ?? "-"} Bedrooms
              </span>
              <span className="flex items-center gap-2">
                <Bath size={18} className="text-plum-600" />
                {property.BathroomsTotalInteger ?? "-"} Bathrooms
              </span>
              <span className="flex items-center gap-2">
                <Ruler size={18} className="text-plum-600" />
                {property.BuildingAreaTotal ? `${property.BuildingAreaTotal} sqft` : "Sqft n/a"}
              </span>
            </div>

            <h2 className="mt-8 text-lg font-bold text-ink">Description</h2>
            <p className="mt-2 leading-relaxed text-ink-soft">
              {property.PublicRemarks || "No description provided for this listing."}
            </p>

            <h2 className="mt-8 text-lg font-bold text-ink">Property Details</h2>
            <dl className="mt-3 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
              <Detail label="MLS®#" value={property.ListingId ?? property.ListingKey} />
              <Detail label="Status" value={property.MlsStatus ?? "-"} />
              <Detail label="Type" value={property.PropertySubType ?? property.PropertyType ?? "-"} />
              <Detail label="Year Built" value={property.YearBuilt ?? "-"} />
              <Detail label="Parking" value={property.ParkingTotal ?? "-"} />
              <Detail label="Brokerage" value={property.ListOfficeName ?? "-"} />
            </dl>
          </Reveal>

          <Reveal delay={0.2} as="aside" className="h-fit rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <p className="text-2xl font-bold text-plum-800">{formatPrice(property.ListPrice)}</p>
            <p className="mt-1 text-sm text-ink-soft">
              MLS® {property.ListingId ?? property.ListingKey}
            </p>

            <div className="mt-6 border-t border-black/10 pt-5">
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

              <a
                href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}?text=${encodeURIComponent(
                  `Hi Marzia, I'm interested in ${property.UnparsedAddress} (MLS ${property.ListingId ?? property.ListingKey})`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 block rounded-full bg-plum-800 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-plum-700"
              >
                Ask about this property
              </a>
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
