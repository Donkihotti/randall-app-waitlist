// app/api/join/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, role = "", website = "" } = await req.json();

  if (website && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email || !emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const LIST_ID = process.env.BREVO_LIST_ID && Number(process.env.BREVO_LIST_ID);

  if (!BREVO_API_KEY || !LIST_ID) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  try {
    const payload = {
      email,
      attributes: role ? { ROLE: role } : undefined,
      listIds: [LIST_ID],
      updateEnabled: true
    };

    if (!payload.attributes) delete payload.attributes;

    const resp = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY
      },
      body: JSON.stringify(payload)
    });

    const body = await resp.json().catch(() => ({}));

    if (resp.ok) {
      return NextResponse.json({ ok: true, data: body }, { status: 201 });
    }

    if (resp.status === 400 && body?.code === "duplicate_parameter") {
      return NextResponse.json({ ok: true, note: "already_exists" });
    }

    return NextResponse.json({ error: body?.message || "Brevo API error", details: body }, { status: 502 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
