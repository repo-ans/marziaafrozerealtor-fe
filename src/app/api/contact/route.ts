import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  topic?: string;
}

// Notification wiring (SMTP/Mailgun) is intentionally left as a TODO — plug
// in nodemailer or Mailgun here once credentials are available, mirroring
// dvr-website-backend's siteNotifyEmail.ts pattern. Until then, submissions
// are accepted and logged server-side rather than silently failing.
export async function POST(req: NextRequest) {
  const body = (await req.json()) as ContactPayload;

  if (!body.name || !body.email) {
    return NextResponse.json(
      { success: false, message: "Name and email are required" },
      { status: 400 }
    );
  }

  console.log("[contact] new inquiry:", body);

  return NextResponse.json({ success: true, message: "Message received" });
}
