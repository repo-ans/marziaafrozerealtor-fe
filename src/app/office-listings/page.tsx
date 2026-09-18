import { redirect } from "next/navigation";

export default async function OfficeListingsRedirect({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const params = new URLSearchParams(sp as Record<string, string>);
  params.set("source", "office");
  redirect(`/listings?${params.toString()}`);
}
