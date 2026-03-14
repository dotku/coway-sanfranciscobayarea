import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// Public endpoint to validate a referral code (no auth required)
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ valid: false });
  }

  const sql = getDb();
  const result = await sql`
    SELECT name, referral_code FROM team_members WHERE referral_code = ${code}
  `;

  if (result.length === 0) {
    return NextResponse.json({ valid: false });
  }

  return NextResponse.json({
    valid: true,
    name: result[0].name,
    referral_code: result[0].referral_code,
  });
}
