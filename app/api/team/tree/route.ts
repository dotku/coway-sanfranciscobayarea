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

  // Get all members with their visit and signup counts
  const members = await sql`
    SELECT
      tm.id,
      tm.name,
      tm.email,
      tm.phone,
      tm.referral_code,
      tm.referred_by,
      tm.created_at,
      COALESCE((SELECT COUNT(*)::int FROM referral_visits rv WHERE rv.referral_code = tm.referral_code), 0) AS visit_count,
      COALESCE((SELECT COUNT(*)::int FROM team_members t2 WHERE t2.referred_by = tm.referral_code), 0) AS signup_count
    FROM team_members tm
    ORDER BY tm.created_at ASC
  `;

  // Get all addresses grouped by member
  const addresses = await sql`
    SELECT member_id, label, address, zip_code
    FROM member_addresses
    ORDER BY created_at ASC
  `;

  const addrMap = new Map<number, { label: string; address: string; zip_code: string | null }[]>();
  for (const a of addresses) {
    if (!addrMap.has(a.member_id)) addrMap.set(a.member_id, []);
    addrMap.get(a.member_id)!.push({ label: a.label, address: a.address, zip_code: a.zip_code });
  }

  const result = members.map((m: Record<string, unknown>) => ({
    ...m,
    addresses: addrMap.get(m.id as number) || [],
  }));

  return NextResponse.json(result);
}
