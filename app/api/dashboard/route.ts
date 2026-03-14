import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { auth0 } from "@/lib/auth0";

export async function GET() {
  const session = await auth0.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const sql = getDb();

  // Get current user's profile
  const profile = await sql`
    SELECT id, name, email, phone, referral_code, referred_by, created_at
    FROM team_members
    WHERE email = ${session.user.email}
  `;

  if (profile.length === 0) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const member = profile[0];
  const code = member.referral_code;

  // Get visit count
  const visitResult = await sql`
    SELECT COUNT(*)::int AS count FROM referral_visits WHERE referral_code = ${code}
  `;

  // Get signup count (people who used this code to sign up)
  const signupResult = await sql`
    SELECT COUNT(*)::int AS count FROM team_members WHERE referred_by = ${code}
  `;

  // Get recent visits (last 10)
  const recentVisits = await sql`
    SELECT visited_at, ip
    FROM referral_visits
    WHERE referral_code = ${code}
    ORDER BY visited_at DESC
    LIMIT 10
  `;

  // Get referred members
  const referredMembers = await sql`
    SELECT name, email, phone, created_at
    FROM team_members
    WHERE referred_by = ${code}
    ORDER BY created_at DESC
  `;

  return NextResponse.json({
    member,
    stats: {
      visits: visitResult[0].count,
      signups: signupResult[0].count,
    },
    recent_visits: recentVisits,
    referred_members: referredMembers,
  });
}
