import { NextRequest, NextResponse } from "next/server";

export function withAdminAuth(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async function wrapped(req: NextRequest) {
    const token = req.cookies.get("dunderthings_admin")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return handler(req);
  };
}
