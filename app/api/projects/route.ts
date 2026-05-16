import { NextRequest, NextResponse } from "next/server";
import { generateId, readStore, scopedProjects, writeStore } from "../../../lib/store";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const rawProfile = params.get("profile");
  const profile = rawProfile ?? undefined;
  const status = params.get("status");
  const query = params.get("q")?.toLowerCase();

  const store = await readStore();
  let rows = scopedProjects(store.projects, profile);

  if (status) rows = rows.filter((p) => p.status === status);
  if (query) {
    rows = rows.filter((p) =>
      [p.title, p.team, p.owner, p.summary, p.nextAction].join(" ").toLowerCase().includes(query),
    );
  }

  return NextResponse.json({ projects: rows });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body?.title || !body?.team || !body?.owner || !body?.dueDate) {
    return NextResponse.json({ error: "title, team, owner y dueDate son obligatorios" }, { status: 400 });
  }

  const store = await readStore();
  const now = new Date().toISOString();
  const project = {
    id: generateId("prj"),
    title: body.title,
    team: body.team,
    owner: body.owner,
    status: body.status ?? "Por hacer",
    risk: body.risk ?? "Normal",
    progress: Number(body.progress ?? 0),
    dueDate: body.dueDate,
    docs: 0,
    comments: 0,
    priority: body.priority ?? "Media",
    summary: body.summary ?? "",
    nextAction: body.nextAction ?? "",
    createdAt: now,
    updatedAt: now,
  };
  store.projects.unshift(project);
  store.audit.unshift({ id: generateId("audit"), action: "Proyecto creado", actor: body.owner, at: now, entity: "project", entityId: project.id });
  await writeStore(store);
  return NextResponse.json({ project }, { status: 201 });
}
