import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUserBySessionToken } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export const runtime = "nodejs";

const maxFileSize = 2 * 1024 * 1024;
const allowedTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
]);

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("mingjian_session")?.value;

  if (!token) {
    return NextResponse.json({ message: "请先登录后再上传头像。" }, { status: 401 });
  }

  const currentUser = await getUserBySessionToken(token);

  if (!currentUser) {
    return NextResponse.json({ message: "登录状态已失效，请重新登录。" }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  const avatar = formData?.get("avatar");

  if (!(avatar instanceof File)) {
    return NextResponse.json({ message: "请选择要上传的头像文件。" }, { status: 400 });
  }

  const extension = allowedTypes.get(avatar.type);

  if (!extension) {
    return NextResponse.json({ message: "头像仅支持 JPG、PNG 或 WebP 格式。" }, { status: 400 });
  }

  if (avatar.size > maxFileSize) {
    return NextResponse.json({ message: "头像大小不能超过 2MB。" }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");
  await mkdir(uploadDir, { recursive: true });

  const filename = `${currentUser.id}-${randomUUID()}${extension}`;
  const absolutePath = path.join(uploadDir, filename);
  const relativePath = `/uploads/avatars/${filename}`;

  await writeFile(absolutePath, Buffer.from(await avatar.arrayBuffer()));

  if (currentUser.avatarUrl?.startsWith("/uploads/avatars/")) {
    const oldFilePath = path.join(process.cwd(), "public", currentUser.avatarUrl.replace(/^\//, ""));
    await unlink(oldFilePath).catch(() => {});
  }

  const prisma = getPrisma();
  await prisma.user.update({
    where: { id: currentUser.id },
    data: { avatarUrl: relativePath },
  });

  return NextResponse.json({
    avatarUrl: relativePath,
  });
}
