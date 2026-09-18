import PropertyListingsView from "@/components/property/PropertyListingsView";

export const metadata = { title: "Just Listed | Marzia Afroze" };

export default async function JustListedPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  return <PropertyListingsView basePath="/buying/just-listed" searchParams={sp} />;
}
