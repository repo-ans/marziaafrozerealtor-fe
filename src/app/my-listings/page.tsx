import { redirect } from "next/navigation";

export default async function MyListingsRedirect({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const params = new URLSearchParams(sp as Record<string, string>);
  params.set("source", "mine");
  redirect(`/listings?${params.toString()}`);
}
