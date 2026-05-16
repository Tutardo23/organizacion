import { NextRequest, NextResponse } from "next/server";
import { generateId, readStore, writeStore } from "../../../lib/store";

export async function GET(request: NextRequest) {
  const projectId = request.nextUrl.searchParams.get("projectId");
  const store = await readStore();
  const documents = projectId ? store.documents.filter((d) => d.projectId === projectId) : store.documents;
  return NextResponse.json({ documents });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body?.projectId || !body?.name || !body?.uploadedBy) return NextResponse.json({ error: "projectId/name/uploadedBy son obligatorios" }, { status: 400 });
  const store = await readStore();
  const document = {
    id: generateId("doc"),
    projectId: body.projectId,
    team: body.team ?? "",
    name: body.name,
    type: body.type ?? "General",
    date: body.date ?? new Date().toISOString().slice(0, 10),
    uploadedBy: body.uploadedBy,
  };
  store.documents.unshift(document);
  const project = store.projects.find((p) => p.id === body.projectId);
  if (project) project.docs += 1;
  await writeStore(store);
  return NextResponse.json({ document }, { status: 201 });
}
