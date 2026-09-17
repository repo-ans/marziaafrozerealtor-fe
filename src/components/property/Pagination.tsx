import Link from "next/link";

function buildHref(basePath: string, params: URLSearchParams, page: number) {
  const next = new URLSearchParams(params);
  next.set("page", String(page));
  return `${basePath}?${next.toString()}`;
}

export default function Pagination({
  basePath,
  searchParams,
  page,
  totalPages,
}: {
  basePath: string;
  searchParams: URLSearchParams;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5">
      <Link
        href={buildHref(basePath, searchParams, Math.max(1, page - 1))}
        aria-disabled={page === 1}
        className={`rounded-full px-3 py-2 text-sm ${
          page === 1 ? "pointer-events-none text-ink-soft/30" : "text-ink hover:bg-cream"
        }`}
      >
        Prev
      </Link>

      {pages.map((p, idx) => (
        <span key={p} className="flex items-center gap-1.5">
          {idx > 0 && pages[idx - 1] !== p - 1 && (
            <span className="px-1 text-ink-soft/40">…</span>
          )}
          <Link
            href={buildHref(basePath, searchParams, p)}
            className={`rounded-full px-3.5 py-2 text-sm ${
              p === page
                ? "bg-plum-800 font-semibold text-white"
                : "text-ink hover:bg-cream"
            }`}
          >
            {p}
          </Link>
        </span>
      ))}

      <Link
        href={buildHref(basePath, searchParams, Math.min(totalPages, page + 1))}
        aria-disabled={page === totalPages}
        className={`rounded-full px-3 py-2 text-sm ${
          page === totalPages
            ? "pointer-events-none text-ink-soft/30"
            : "text-ink hover:bg-cream"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
