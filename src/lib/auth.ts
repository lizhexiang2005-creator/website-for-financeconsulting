import { cookies } from "next/headers";
import { getPrisma } from "@/lib/prisma";

export type CurrentUser = {
  id: string;
  phone: string;
  nickname: string | null;
  avatarUrl: string | null;
  bio: string | null;
  createdAt: Date;
  lastLoginAt: Date | null;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("mingjian_session")?.value;

  if (!token) {
    return null;
  }

  const prisma = getPrisma();
  const session = await prisma.loginSession.findUnique({
    where: { token },
    select: {
      id: true,
      expiresAt: true,
      user: {
        select: {
          id: true,
          phone: true,
          nickname: true,
          avatarUrl: true,
          bio: true,
          createdAt: true,
          lastLoginAt: true,
        },
      },
    },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt.getTime() <= Date.now()) {
    await prisma.loginSession.delete({
      where: { token },
    });

    return null;
  }

  return session.user;
}

export async function getUserBySessionToken(token: string): Promise<CurrentUser | null> {
  const prisma = getPrisma();
  const session = await prisma.loginSession.findUnique({
    where: { token },
    select: {
      expiresAt: true,
      user: {
        select: {
          id: true,
          phone: true,
          nickname: true,
          avatarUrl: true,
          bio: true,
          createdAt: true,
          lastLoginAt: true,
        },
      },
    },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt.getTime() <= Date.now()) {
    await prisma.loginSession.delete({
      where: { token },
    });

    return null;
  }

  return session.user;
}
