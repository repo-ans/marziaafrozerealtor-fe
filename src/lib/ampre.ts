import "server-only";
import type {
  IProperty,
  IPropertyDetail,
  IPropertyFilters,
  PropertyListingType,
} from "@/types/property";
import { getMockProperties, getMockPropertyByKey } from "@/lib/mockProperties";

// Same provider Dream Valley Realty's own site uses: TRREB's MLS data via
// AMPRE's RESO Web API (OData v4). Three access tiers, matching the real
// tokens issued to DVR (dvr-website-backend uses the same names):
//   - IDX: all public active listings (general search / "All Listings")
//   - DLA: the brokerage's own feed (used for both "Office Listings" and,
//          with an added ListAgentFullName filter, "My Listings")
//   - VOW: full access incl. sold/closed — reserved for a future
//          login-gated sold-history feature, not used yet.
const AMPRE_BASE = "https://query.ampre.ca/odata";

const OFFICE_NAME = process.env.AMPRE_OFFICE_NAME || "DREAM VALLEY REALTY INC.";
const AGENT_NAME = process.env.AMPRE_AGENT_NAME || "Marzia Afroze";

type FeedTier = "idx" | "dla" | "vow";

function tokenFor(tier: FeedTier): string | undefined {
  const fallback = process.env.AMPRE_TOKEN_DVR || process.env.AMPRE_TOKEN;
  switch (tier) {
    case "idx":
      return process.env.AMPRE_TOKEN_IDX || fallback;
    case "dla":
      return process.env.AMPRE_TOKEN_DLA || fallback;
    case "vow":
      return process.env.AMPRE_TOKEN_VOW || fallback;
  }
}

function tierForSource(source: IPropertyFilters["source"]): FeedTier {
  if (source === "office" || source === "mine") return "dla";
  return "idx";
}

const PROPERTY_SELECT = [
  "ListingKey",
  "ListingId",
  "ListPrice",
  "UnparsedAddress",
  "StreetNumber",
  "StreetName",
  "City",
  "StateOrProvince",
  "PostalCode",
  "BedroomsTotal",
  "BathroomsTotalInteger",
  "BuildingAreaTotal",
  "LivingAreaRange",
  "PropertyType",
  "PropertySubType",
  "MlsStatus",
  "StandardStatus",
  "TransactionType",
  "ListOfficeName",
  "ListAgentFullName",
  "ListingContractDate",
  "ModificationTimestamp",
].join(",");

function typeFilter(type?: PropertyListingType): string | null {
  switch (type) {
    case "residential":
      return "PropertyType eq 'Residential'";
    case "condo":
      return "PropertySubType eq 'Condo Apartment'";
    case "commercial":
      return "PropertyType eq 'Commercial'";
    case "open-houses":
      return null; // handled by a separate OpenHouse lookup in a future pass
    case "pre-construction":
      return "TransactionType eq 'For Sale' and StandardStatus eq 'Pending'";
    default:
      return null;
  }
}

function isMlsKeyLike(q: string) {
  return /^[A-Za-z]\d{4,}$/.test(q.trim());
}

function buildFilter(filters: IPropertyFilters): string {
  const clauses: string[] = ["StandardStatus eq 'Active'"];

  if (filters.source === "office") {
    clauses.push(`ListOfficeName eq '${OFFICE_NAME.replace(/'/g, "''")}'`);
  } else if (filters.source === "mine") {
    // AMPRE stores ListAgentFullName as "NAME, Designation" (e.g.
    // "SABBIR KHAN, Broker of Record") — an exact `eq` match on just the
    // name never hits. `contains` on this server is already
    // case-insensitive, so a plain substring match on the name handles
    // both the designation suffix and inconsistent casing across records.
    const agent = AGENT_NAME.replace(/'/g, "''");
    clauses.push(`contains(ListAgentFullName,'${agent}')`);
  }

  const tf = typeFilter(filters.type);
  if (tf) clauses.push(tf);

  if (filters.city) {
    clauses.push(`contains(City,'${filters.city.replace(/'/g, "''")}')`);
  }

  if (filters.q && !isMlsKeyLike(filters.q)) {
    const q = filters.q.replace(/'/g, "''");
    clauses.push(
      `(contains(UnparsedAddress,'${q}') or contains(City,'${q}') or contains(PostalCode,'${q}'))`
    );
  }

  return clauses.join(" and ");
}

async function fetchOData<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${AMPRE_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`AMPRE request failed (${res.status}): ${path}`);
  }
  return res.json();
}

async function attachThumbnails(
  properties: IProperty[],
  token: string
): Promise<IProperty[]> {
  if (properties.length === 0) return properties;
  const keys = properties.map((p) => `'${p.ListingKey}'`).join(",");
  const mediaFilter = encodeURIComponent(
    `ResourceName eq 'Property' and ImageSizeDescription eq 'Large' and MediaStatus eq 'Active' and ResourceRecordKey in (${keys})`
  );
  try {
    const media = await fetchOData<{
      value: { ResourceRecordKey: string; MediaURL: string }[];
    }>(
      `/Media?$filter=${mediaFilter}&$select=ResourceRecordKey,MediaURL`,
      token
    );
    const byKey = new Map<string, string>();
    for (const m of media.value) {
      if (!byKey.has(m.ResourceRecordKey)) byKey.set(m.ResourceRecordKey, m.MediaURL);
    }
    return properties.map((p) => ({
      ...p,
      images: byKey.has(p.ListingKey)
        ? [byKey.get(p.ListingKey)!]
        : ["https://placehold.co/800x600?text=No+Image"],
    }));
  } catch {
    return properties.map((p) => ({
      ...p,
      images: ["https://placehold.co/800x600?text=No+Image"],
    }));
  }
}

export async function fetchProperties(filters: IPropertyFilters): Promise<{
  items: IProperty[];
  total: number;
  page: number;
  pageSize: number;
}> {
  const tier = tierForSource(filters.source);
  const token = tokenFor(tier);
  const page = filters.page && filters.page > 0 ? filters.page : 1;
  const pageSize = Math.min(filters.pageSize || 12, 100);

  if (!token) {
    // No AMPRE credentials configured yet — serve sample data so the site
    // stays fully browsable during design/dev. Wire real env vars (see
    // .env.example) to switch to live TRREB data automatically.
    return getMockProperties(filters, page, pageSize);
  }

  const filter = encodeURIComponent(buildFilter(filters));
  const skip = (page - 1) * pageSize;
  const path =
    `/Property?$filter=${filter}&$select=${PROPERTY_SELECT}` +
    `&$orderby=ListingContractDate desc&$top=${pageSize}&$skip=${skip}&$count=true`;

  const result = await fetchOData<{ "@odata.count": number; value: IProperty[] }>(
    path,
    token
  );

  const items = await attachThumbnails(
    result.value.map((v) => ({ ...v, images: [] })),
    token
  );

  return { items, total: result["@odata.count"], page, pageSize };
}

async function fetchAllMediaForListing(
  listingKey: string,
  token: string
): Promise<string[]> {
  const mediaFilter = encodeURIComponent(
    `ResourceRecordKey eq '${listingKey.replace(/'/g, "''")}' and ResourceName eq 'Property' ` +
      `and ImageSizeDescription eq 'Large' and MediaStatus eq 'Active'`
  );
  try {
    const media = await fetchOData<{ value: { MediaURL: string; Order?: number }[] }>(
      `/Media?$filter=${mediaFilter}&$select=MediaURL,Order&$orderby=Order asc`,
      token
    );
    return media.value.map((m) => m.MediaURL);
  } catch {
    return [];
  }
}

export async function fetchPropertyByKey(
  listingKey: string
): Promise<IPropertyDetail | null> {
  const token = tokenFor("idx");
  if (!token) {
    return getMockPropertyByKey(listingKey);
  }

  const filter = encodeURIComponent(`ListingKey eq '${listingKey.replace(/'/g, "''")}'`);
  const result = await fetchOData<{ value: IPropertyDetail[] }>(
    `/Property?$filter=${filter}`,
    token
  );
  const property = result.value[0];
  if (!property) return null;

  const images = await fetchAllMediaForListing(listingKey, token);

  return {
    ...property,
    images: images.length > 0 ? images : ["https://placehold.co/1200x800?text=No+Image"],
  };
}
