// app/api/posters/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  try {
    const body = await req.json();
    const {
      title,
      author,
      description,
      fonts,
      colors,
      tools,
      published,
      imgUrl,
      tags,
    } = body;

    if (
      !title ||
      !author ||
      !fonts ||
      !colors ||
      !tools ||
      !published ||
      !tags
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const categories = await Promise.all(
      tags.map(async (tag: string) => {
        return prisma.category.upsert({
          where: { name: tag },
          update: {},
          create: { name: tag },
        });
      })
    );

    const newPoster = await prisma.poster.create({
      data: {
        title,
        userId: session?.user.id as string,
        description,
        fonts,
        colors,
        tools,
        socials: [],
        views: 0,
        imgUrl,
        categoryIds: categories.map((c) => c.id),
        posterCategories: {
          create: categories.map((category) => ({
            category: { connect: { id: category.id } },
          })),
        },
      },
      include: {
        posterCategories: true,
      },
    });

    return NextResponse.json(newPoster, { status: 201 });
  } catch (error) {
    console.error("Chyba při POST /api/posters:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const posters = await prisma.poster.findMany({
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
    console.error("Chyba při GET /api/posters:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
