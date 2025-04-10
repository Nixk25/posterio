import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { headers } from "next/headers";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const posters = await prisma.poster.findMany({
      where: {
        userId: userId,
      },
      include: {
        posterCategories: {
          include: {
            category: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedPosters = posters.map((poster) => ({
      ...poster,
      tags: poster.posterCategories.map((pc) => pc.category.name),
    }));

    return NextResponse.json(formattedPosters, { status: 200 });
  } catch (error) {
    console.error("Error fetching user posters:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
