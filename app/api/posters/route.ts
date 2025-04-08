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
