import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { auth0 } from "@/lib/auth0";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  const session = await auth0.getSession();
  if (!session?.user || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getDb();

  const locations = await sql`
    SELECT
      tm.name,
      tm.email,
      tm.phone,
      tm.referral_code,
      ma.label,
      ma.address,
      ma.zip_code
    FROM team_members tm
    JOIN member_addresses ma ON ma.member_id = tm.id
    ORDER BY tm.name, ma.created_at
  `;

  return NextResponse.json(locations);
}
