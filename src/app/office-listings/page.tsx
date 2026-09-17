import PropertyListingsView from "@/components/property/PropertyListingsView";
import { siteConfig } from "@/config/site";

export const metadata = { title: "Office Listings | Marzia Afroze" };

export default async function OfficeListingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  return (
    <PropertyListingsView
      source="office"
      title={`${siteConfig.brokerage} — Office Listings`}
      basePath="/office-listings"
      searchParams={sp}
    />
  );
}
