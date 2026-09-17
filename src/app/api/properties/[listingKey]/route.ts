import { NextResponse } from "next/server";
import { fetchPropertyByKey } from "@/lib/ampre";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ listingKey: string }> }
) {
  const { listingKey } = await params;

  try {
    const property = await fetchPropertyByKey(listingKey);
    if (!property) {
      return NextResponse.json(
        { success: false, message: "Listing not found", data: null },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Property fetched",
      data: property,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Failed to fetch property",
        data: null,
      },
      { status: 502 }
    );
  }
}
