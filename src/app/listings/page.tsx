import PropertyListingsView from "@/components/property/PropertyListingsView";

export const metadata = { title: "Property Listings | Marzia Afroze" };

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  return <PropertyListingsView basePath="/listings" searchParams={sp} />;
}
