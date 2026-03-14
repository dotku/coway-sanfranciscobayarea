import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// Track a visit and return the referrer's public stats
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const sql = getDb();

  // Get referrer info
  const member = await sql`
    SELECT id, name, referral_code, created_at
    FROM team_members WHERE referral_code = ${code}
  `;

  if (member.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Track the visit
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "";
  const userAgent = request.headers.get("user-agent") || "";

  await sql`
    INSERT INTO referral_visits (referral_code, ip, user_agent)
    VALUES (${code}, ${ip}, ${userAgent})
  `;

  // Get stats
  const visitResult = await sql`
    SELECT COUNT(*)::int AS count FROM referral_visits WHERE referral_code = ${code}
  `;
  const signupResult = await sql`
    SELECT COUNT(*)::int AS count FROM team_members WHERE referred_by = ${code}
  `;

  return NextResponse.json({
    name: member[0].name,
    referral_code: member[0].referral_code,
    member_since: member[0].created_at,
    visits: visitResult[0].count,
    signups: signupResult[0].count,
  });
}
