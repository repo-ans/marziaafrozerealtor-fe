import { NextRequest, NextResponse } from "next/server";
import { fetchProperties } from "@/lib/ampre";
import type { IPropertyFilters, PropertyListingType, PropertySource } from "@/types/property";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;

  const filters: IPropertyFilters = {
    source: (sp.get("source") as PropertySource) || "idx",
    city: sp.get("city") || undefined,
    type: (sp.get("type") as PropertyListingType) || undefined,
    q: sp.get("q") || undefined,
    page: Number(sp.get("page")) || 1,
    pageSize: Number(sp.get("pageSize")) || 12,
  };

  try {
    const data = await fetchProperties(filters);
    return NextResponse.json({
      success: true,
      message: "Properties fetched",
      data,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Failed to fetch properties",
        data: { items: [], total: 0, page: filters.page ?? 1, pageSize: filters.pageSize ?? 12 },
      },
      { status: 502 }
    );
  }
}
