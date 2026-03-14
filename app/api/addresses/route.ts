import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { auth0 } from "@/lib/auth0";

async function getMemberId(email: string) {
  const sql = getDb();
  const result = await sql`
    SELECT id FROM team_members WHERE email = ${email}
  `;
  return result.length > 0 ? result[0].id : null;
}

export async function GET() {
  const session = await auth0.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const memberId = await getMemberId(session.user.email as string);
  if (!memberId) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const sql = getDb();
  const addresses = await sql`
    SELECT id, label, address, zip_code, created_at
    FROM member_addresses
    WHERE member_id = ${memberId}
    ORDER BY created_at ASC
  `;

  return NextResponse.json(addresses);
}

export async function POST(request: NextRequest) {
  const session = await auth0.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const memberId = await getMemberId(session.user.email as string);
  if (!memberId) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const { label, address, zip_code } = await request.json();

  if (!label || !address) {
    return NextResponse.json(
      { error: "Label and address are required" },
      { status: 400 }
    );
  }

  const sql = getDb();
  const result = await sql`
    INSERT INTO member_addresses (member_id, label, address, zip_code)
    VALUES (${memberId}, ${label}, ${address}, ${zip_code || null})
    RETURNING id, label, address, zip_code, created_at
  `;

  return NextResponse.json(result[0], { status: 201 });
}

export async function PUT(request: NextRequest) {
  const session = await auth0.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const memberId = await getMemberId(session.user.email as string);
  if (!memberId) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const { id, label, address, zip_code } = await request.json();

  if (!id || !label || !address) {
    return NextResponse.json(
      { error: "ID, label and address are required" },
      { status: 400 }
    );
  }

  const sql = getDb();
  const result = await sql`
    UPDATE member_addresses
    SET label = ${label}, address = ${address}, zip_code = ${zip_code || null}
    WHERE id = ${id} AND member_id = ${memberId}
    RETURNING id, label, address, zip_code, created_at
  `;

  if (result.length === 0) {
    return NextResponse.json({ error: "Address not found" }, { status: 404 });
  }

  return NextResponse.json(result[0]);
}

export async function DELETE(request: NextRequest) {
  const session = await auth0.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const memberId = await getMemberId(session.user.email as string);
  if (!memberId) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const sql = getDb();
  const result = await sql`
    DELETE FROM member_addresses
    WHERE id = ${id} AND member_id = ${memberId}
    RETURNING id
  `;

  if (result.length === 0) {
    return NextResponse.json({ error: "Address not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
