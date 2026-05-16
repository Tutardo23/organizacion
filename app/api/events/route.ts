import { NextRequest, NextResponse } from "next/server";
import { generateId, readStore, writeStore } from "../../../lib/store";

export async function GET(request: NextRequest) {
  const profile = request.nextUrl.searchParams.get("profile");
  const store = await readStore();
  const events = profile ? store.events.filter((e) => e.team === profile) : store.events;
  return NextResponse.json({ events });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body?.title || !body?.team || !body?.startsAt) return NextResponse.json({ error: "title/team/startsAt son obligatorios" }, { status: 400 });
  const store = await readStore();
  const event = { id: generateId("evt"), title: body.title, team: body.team, startsAt: body.startsAt, type: body.type ?? "Reunión" };
  store.events.push(event);
  await writeStore(store);
  return NextResponse.json({ event }, { status: 201 });
}
