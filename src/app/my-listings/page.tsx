import PropertyListingsView from "@/components/property/PropertyListingsView";
import { siteConfig } from "@/config/site";

export const metadata = { title: "My Listings | Marzia Afroze" };

export default async function MyListingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  return (
    <PropertyListingsView
      source="mine"
      title={`${siteConfig.agentName}'s Listings`}
      basePath="/my-listings"
      searchParams={sp}
    />
  );
}
