import { fetchProperties } from "@/lib/ampre";
import type { PropertySource } from "@/types/property";
import FeaturedListingsSection from "@/components/home/FeaturedListingsSection";

export default async function FeaturedRow({
  source,
  eyebrow,
  title,
  subtitle,
  viewAllHref,
  dark = false,
}: {
  source: PropertySource;
  eyebrow: string;
  title: string;
  subtitle?: string;
  viewAllHref: string;
  dark?: boolean;
}) {
  const { items } = await fetchProperties({ source, page: 1, pageSize: 6 });

  return (
    <FeaturedListingsSection
      items={items}
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      viewAllHref={viewAllHref}
      dark={dark}
    />
  );
}
