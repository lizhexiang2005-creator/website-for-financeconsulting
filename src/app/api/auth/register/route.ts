import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/password";
import { getPrisma } from "@/lib/prisma";
import {
  normalizePhone,
  validateNickname,
  validatePassword,
  validatePhone,
  type AuthErrors,
} from "@/lib/auth-validation";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const phone = normalizePhone(body?.phone);
    const password = String(body?.password ?? "");
    const nickname = String(body?.nickname ?? "").trim();

    const errors: AuthErrors = {};
    errors.phone = validatePhone(phone);
    errors.password = validatePassword(password);
    errors.nickname = validateNickname(nickname);

    const activeErrors = Object.fromEntries(Object.entries(errors).filter(([, value]) => value));

    if (Object.keys(activeErrors).length > 0) {
      return NextResponse.json({ errors: activeErrors }, { status: 400 });
    }

    const prisma = getPrisma();
    const existingUser = await prisma.user.findUnique({
      where: { phone },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json({ errors: { phone: "该手机号已注册，请直接登录" } }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        phone,
        passwordHash,
        nickname: nickname || null,
      },
      select: {
        id: true,
        phone: true,
        nickname: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error && error.message.includes("DATABASE_URL")
        ? "数据库连接还没配置好，请先启动本地数据库。"
        : error instanceof Error && "code" in error && error.code === "ECONNREFUSED"
          ? "本地数据库还没启动，暂时无法创建账号。"
          : "注册服务暂时不可用，请稍后再试。";

    return NextResponse.json({ message }, { status: 500 });
  }
}
