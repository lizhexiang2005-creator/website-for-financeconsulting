import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { verifyPassword } from "@/lib/password";
import { getPrisma } from "@/lib/prisma";
import { normalizePhone, validatePassword, validatePhone, type AuthErrors } from "@/lib/auth-validation";

const sessionMaxAgeSeconds = 60 * 60 * 24 * 30;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const phone = normalizePhone(body?.phone);
    const password = String(body?.password ?? "");

    const errors: AuthErrors = {
      phone: validatePhone(phone),
      password: validatePassword(password),
    };
    const activeErrors = Object.fromEntries(Object.entries(errors).filter(([, value]) => value));

    if (Object.keys(activeErrors).length > 0) {
      return NextResponse.json({ errors: activeErrors }, { status: 400 });
    }

    const prisma = getPrisma();
    const user = await prisma.user.findUnique({
      where: { phone },
      select: {
        id: true,
        phone: true,
        nickname: true,
        passwordHash: true,
      },
    });

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ message: "手机号或密码不正确" }, { status: 401 });
    }

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + sessionMaxAgeSeconds * 1000);

    await prisma.$transaction([
      prisma.loginSession.create({
        data: {
          token,
          expiresAt,
          userId: user.id,
        },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      }),
    ]);

    const response = NextResponse.json({
      user: {
        id: user.id,
        phone: user.phone,
        nickname: user.nickname,
      },
    });
    response.cookies.set("mingjian_session", token, {
      httpOnly: true,
      maxAge: sessionMaxAgeSeconds,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  } catch (error) {
    const message =
      error instanceof Error && error.message.includes("DATABASE_URL")
        ? "数据库连接还没配置好，请先启动本地数据库。"
        : error instanceof Error && "code" in error && error.code === "ECONNREFUSED"
          ? "本地数据库还没启动，暂时无法登录。"
          : "登录服务暂时不可用，请稍后再试。";

    return NextResponse.json({ message }, { status: 500 });
  }
}
