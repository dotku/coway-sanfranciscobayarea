import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { auth0 } from "@/lib/auth0";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  const session = await auth0.getSession();
  if (!session?.user || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getDb();
  const members = await sql`
    SELECT id, name, email, phone, referral_code, referred_by, created_at
    FROM team_members
    ORDER BY created_at DESC
  `;
  return NextResponse.json(members);
}

export async function PUT(request: NextRequest) {
  const session = await auth0.getSession();
  if (!session?.user || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, name, email, phone } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const sql = getDb();

  const updates: string[] = [];
  if (name !== undefined) updates.push("name");
  if (email !== undefined) updates.push("email");
  if (phone !== undefined) updates.push("phone");

  if (updates.length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  const result = await sql`
    UPDATE team_members
    SET
      name = COALESCE(${name ?? null}, name),
      email = COALESCE(${email ?? null}, email),
      phone = COALESCE(${phone ?? null}, phone)
    WHERE id = ${id}
    RETURNING id, name, email, phone, referral_code, referred_by, created_at
  `;

  if (result.length === 0) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  return NextResponse.json(result[0]);
}

export async function DELETE(request: NextRequest) {
  const session = await auth0.getSession();
  if (!session?.user || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const sql = getDb();
  const result = await sql`
    DELETE FROM team_members WHERE id = ${id} RETURNING id
  `;

  if (result.length === 0) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
