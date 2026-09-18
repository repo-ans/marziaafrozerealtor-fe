export function formatPrice(price?: number | null, transactionType?: string | null) {
  if (!price) return "Price on Request";
  const formatted = `$${price.toLocaleString("en-CA")}`;
  return transactionType === "For Lease" ? `${formatted}/mo` : formatted;
}

export function formatAddedAgo(iso?: string | null): string | null {
  if (!iso) return null;
  const ts = new Date(iso).getTime();
  if (isNaN(ts)) return null;
  const diffMs = Date.now() - ts;
  if (diffMs < 0) return "Just added";
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just added";
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

// Same status → colour mapping as Dream Valley Realty's own listing cards.
export function statusBadgeColor(status?: string | null): string {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-accent-green";
    case "sold":
      return "bg-red-500";
    case "pending":
      return "bg-amber-500";
    case "terminated":
    case "expired":
      return "bg-gray-500";
    default:
      return "bg-plum-600";
  }
}
