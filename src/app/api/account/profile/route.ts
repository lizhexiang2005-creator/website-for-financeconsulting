import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUserBySessionToken } from "@/lib/auth";
import { validateNickname } from "@/lib/auth-validation";
import { getPrisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("mingjian_session")?.value;

  if (!token) {
    return NextResponse.json({ message: "请先登录后再编辑昵称。" }, { status: 401 });
  }

  const currentUser = await getUserBySessionToken(token);

  if (!currentUser) {
    return NextResponse.json({ message: "登录状态已失效，请重新登录。" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const nickname = String(body?.nickname ?? "").trim();
  const nicknameError = validateNickname(nickname);

  if (nicknameError) {
    return NextResponse.json({ message: nicknameError }, { status: 400 });
  }

  const prisma = getPrisma();
  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      nickname: nickname || null,
    },
    select: {
      nickname: true,
    },
  });

  return NextResponse.json({
    nickname: user.nickname,
  });
}
