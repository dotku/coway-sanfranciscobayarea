import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { auth0 } from "@/lib/auth0";
import { isAdmin } from "@/lib/admin";

function generateReferralCode(): string {
  // Generate code with JY prefix + 6 digits (e.g. JY111200)
  return "JY" + String(100000 + Math.floor(Math.random() * 900000));
}

// Check if current user has completed their profile
export async function GET() {
  const session = await auth0.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const sql = getDb();
  const result = await sql`
    SELECT id, name, email, phone, referral_code, created_at
    FROM team_members
    WHERE email = ${session.user.email}
  `;

  const admin = isAdmin(session.user.email);

  if (result.length === 0) {
    return NextResponse.json({ exists: false, isAdmin: admin });
  }

  return NextResponse.json({ exists: true, member: result[0], isAdmin: admin });
}

// Save phone number for current user (complete profile)
export async function POST(request: NextRequest) {
  const session = await auth0.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json();
  const { phone, referred_by } = body;

  if (!phone) {
    return NextResponse.json(
      { error: "Phone number is required" },
      { status: 400 }
    );
  }

  const sql = getDb();
  const name: string = session.user.name || session.user.email || "User";
  const email: string = session.user.email || "";
  const admin = isAdmin(email);

  // Admin accounts don't need a referral code
  if (!admin) {
    if (!referred_by) {
      return NextResponse.json(
        { error: "Referral code is required" },
        { status: 400 }
      );
    }

    // Validate the referral code exists
    const referrer = await sql`
      SELECT id, name FROM team_members WHERE referral_code = ${referred_by}
    `;
    if (referrer.length === 0) {
      return NextResponse.json(
        { error: "Invalid referral code 推荐码无效" },
        { status: 400 }
      );
    }
  }

  // Check if already exists
  const existing = await sql`
    SELECT id, referral_code FROM team_members WHERE email = ${email}
  `;
  if (existing.length > 0) {
    await sql`
      UPDATE team_members SET phone = ${phone} WHERE email = ${email}
    `;
    return NextResponse.json({
      success: true,
      referral_code: existing[0].referral_code,
    });
  }

  // Generate unique referral code for this new member
  let referralCode = generateReferralCode();
  let attempts = 0;
  while (attempts < 10) {
    const conflict = await sql`
      SELECT id FROM team_members WHERE referral_code = ${referralCode}
    `;
    if (conflict.length === 0) break;
    referralCode = generateReferralCode();
    attempts++;
  }

  const result = await sql`
    INSERT INTO team_members (name, email, phone, referral_code, referred_by)
    VALUES (${name}, ${email}, ${phone}, ${referralCode}, ${admin ? null : referred_by})
    RETURNING referral_code
  `;

  return NextResponse.json(
    { success: true, referral_code: result[0].referral_code },
    { status: 201 }
  );
}
