import { NextRequest, NextResponse } from "next/server";
import { readStore, scopedProjects } from "../../../lib/store";

export async function GET(request: NextRequest) {
  const rawProfile = request.nextUrl.searchParams.get("profile");
  const profile = rawProfile ?? undefined;
  const store = await readStore();
  const scoped = scopedProjects(store.projects, profile);
  const active = scoped.filter((p) => p.status !== "Finalizado").length;
  const critical = scoped.filter((p) => p.risk === "Crítico").length;
  const review = scoped.filter((p) => p.status === "En revisión").length;
  const docs = scoped.reduce((acc, p) => acc + p.docs, 0);
  return NextResponse.json({ metrics: { active, critical, review, docs }, total: scoped.length });
}
