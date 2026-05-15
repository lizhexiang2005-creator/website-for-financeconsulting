import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("mingjian_session")?.value;

  if (token) {
    const prisma = getPrisma();
    await prisma.loginSession.deleteMany({
      where: { token },
    });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("mingjian_session", "", {
    httpOnly: true,
    maxAge: 0,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}
