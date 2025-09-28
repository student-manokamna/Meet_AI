import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export async function GET(
  req: Request,
  { params }: { params: { auth: string; all: string[] } }
) {
  // params.auth contains first dynamic segment
  // params.all contains rest of the path

  // Example: /api/auth/get-session
  // params.auth = "get-session", params.all = []

  if (params.auth === "get-session") {
    const session = await auth.api.getSession({ headers: req.headers });
    return NextResponse.json({ session });
  }

  return NextResponse.json({ error: "Route not found" }, { status: 404 });
}

// Agar POST bhi chahiye
export const POST = toNextJsHandler(auth).POST;
