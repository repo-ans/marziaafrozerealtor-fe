import "server-only";
import type { IProperty, IPropertyDetail, IPropertyFilters } from "@/types/property";
import { siteConfig } from "@/config/site";

// Sample fixtures used only until real AMPRE_TOKEN_* env vars are set
// (see .env.example). Shape matches the live AMPRE/RESO response exactly,
// so switching to real data requires no UI changes.
const CITIES = ["Scarborough", "Toronto", "Markham", "Richmond Hill", "Oakville", "Ajax"];

// Real stock photos so sample listings look presentable before a live AMPRE
// feed is connected — swapped out automatically once AMPRE_TOKEN_* is set.
const SAMPLE_PHOTOS = [
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
];
const STREETS = [
  "138 S Clairlea Road",
  "81-330 Mccowan Road",
  "704-810 Birchmount Road",
  "2156 Paisley Road",
  "53 Sunset Boulevard",
  "20-1 Hycrest Avenue",
  "2261 Seton Crescent",
  "319-2333 Taunton Road",
  "80 Lantern Road",
  "421-2333 Taunton Road",
  "13 Stotts Crescent",
  "935 Twenty Road",
];

function seededProperty(i: number, overrides: Partial<IProperty> = {}): IProperty {
  const city = CITIES[i % CITIES.length];
  const price = 499_000 + (i % 12) * 65_000;
  return {
    ListingKey: `SAMPLE${1000 + i}`,
    ListingId: `X${13795190 - i * 2}`,
    ListPrice: price,
    UnparsedAddress: `${STREETS[i % STREETS.length]}, ${city}, ON`,
    StreetNumber: null,
    StreetName: null,
    City: city,
    StateOrProvince: "ON",
    PostalCode: null,
    BedroomsTotal: 1 + (i % 4),
    BathroomsTotalInteger: 1 + (i % 3),
    BuildingAreaTotal: 800 + (i % 6) * 200,
    LivingAreaRange: null,
    PropertyType: i % 5 === 0 ? "Commercial" : "Residential",
    PropertySubType: i % 3 === 0 ? "Condo Apartment" : "Detached",
    MlsStatus: "Active",
    StandardStatus: "Active",
    TransactionType: "For Sale",
    ListOfficeName: overrides.ListOfficeName ?? "RE/MAX HALLMARK REALTY LTD.",
    ListAgentFullName: overrides.ListAgentFullName ?? "Sample Agent",
    ListingContractDate: new Date(Date.now() - i * 3600_000).toISOString(),
    ModificationTimestamp: new Date().toISOString(),
    images: [SAMPLE_PHOTOS[i % SAMPLE_PHOTOS.length]],
    ...overrides,
  };
}

const ALL_SAMPLE: IProperty[] = Array.from({ length: 24 }, (_, i) => seededProperty(i));

const OFFICE_SAMPLE: IProperty[] = Array.from({ length: 10 }, (_, i) =>
  seededProperty(i + 100, {
    ListOfficeName: siteConfig.brokerage.toUpperCase(),
    ListAgentFullName: i % 3 === 0 ? siteConfig.agentName : "Other DVR Agent",
  })
);

const MINE_SAMPLE: IProperty[] = Array.from({ length: 6 }, (_, i) =>
  seededProperty(i + 200, {
    ListOfficeName: siteConfig.brokerage.toUpperCase(),
    ListAgentFullName: siteConfig.agentName,
  })
);

function poolFor(filters: IPropertyFilters): IProperty[] {
  if (filters.source === "office") return OFFICE_SAMPLE;
  if (filters.source === "mine") return MINE_SAMPLE;
  return ALL_SAMPLE;
}

export function getMockProperties(
  filters: IPropertyFilters,
  page: number,
  pageSize: number
) {
  let pool = poolFor(filters);

  if (filters.city) {
    pool = pool.filter((p) => p.City?.toLowerCase() === filters.city!.toLowerCase());
  }
  if (filters.q) {
    const q = filters.q.toLowerCase();
    pool = pool.filter(
      (p) =>
        p.UnparsedAddress?.toLowerCase().includes(q) ||
        p.City?.toLowerCase().includes(q) ||
        p.ListingKey.toLowerCase().includes(q)
    );
  }

  const total = pool.length;
  const start = (page - 1) * pageSize;
  const items = pool.slice(start, start + pageSize);
  return { items, total, page, pageSize };
}

export function getMockPropertyByKey(listingKey: string): IPropertyDetail | null {
  const base = [...ALL_SAMPLE, ...OFFICE_SAMPLE, ...MINE_SAMPLE].find(
    (p) => p.ListingKey === listingKey
  );
  if (!base) return null;
  return {
    ...base,
    images: SAMPLE_PHOTOS,
    PublicRemarks:
      "Sample listing description — connect a live AMPRE feed to show real MLS remarks here.",
    LotSizeArea: null,
    LotSizeUnits: null,
    YearBuilt: 2015,
    ParkingTotal: 2,
    AssociationFee: null,
    TaxAnnualAmount: null,
    CityRegion: `${base.City} District`,
    ArchitecturalStyle: "Apartment",
    ContractStatus: "Available",
    rooms: [],
    priceHistory: [],
  };
}
