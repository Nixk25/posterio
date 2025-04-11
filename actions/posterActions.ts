// app/actions/posterActions.ts
"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { PosterType } from "@/app/(pages)/poster/[slug]/page";

export async function createPoster(posterDetails: PosterType) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  try {
    const { title, description, fonts, colors, tools, imgUrl, tags } =
      posterDetails;

    if (!title || !fonts || !colors || !tools || !tags) {
      return { success: false, error: "Missing required fields" };
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

    revalidatePath("/");
    return { success: true, data: newPoster };
  } catch (error) {
    console.error("Could not create poster:", error);
    return { success: false, error: "Failed to create poster" };
  }
}

export async function getPosters() {
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

    return { success: true, data: formattedPosters };
  } catch (error) {
    console.error("Cannot fetch posters:", error);
    return { success: false, error: "Failed to fetch posters" };
  }
}

export async function deletePoster(posterId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  try {
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const poster = await prisma.poster.findUnique({
      where: { id: posterId },
    });

    if (!poster) {
      return { success: false, error: "Poster not found" };
    }

    if (poster.userId !== session.user.id) {
      return {
        success: false,
        error: "You do not have permission to delete this poster",
      };
    }

    await prisma.posterCategory.deleteMany({
      where: { posterId: posterId },
    });

    await prisma.poster.delete({
      where: { id: posterId },
    });

    const categoriesToDelete = await prisma.category.findMany({
      where: {
        posters: {
          none: {},
        },
      },
    });

    if (categoriesToDelete.length > 0) {
      await prisma.category.deleteMany({
        where: {
          id: {
            in: categoriesToDelete.map((category) => category.id),
          },
        },
      });
    }

    revalidatePath("/profile");

    return { success: true };
  } catch (error) {
    console.error("Error deleting poster:", error);
    return { success: false, error: "Failed to delete poster" };
  }
}

export async function getUserPosters() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Uživatel není přihlášen",
      posters: [],
    };
  }

  try {
    const posters = await prisma.poster.findMany({
      where: {
        userId: session.user.id,
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

    return {
      success: true,
      posters: formattedPosters,
    };
  } catch (error) {
    console.error("We couldn't load user posters:", error);
    return {
      success: false,
      error: "Something went wrong with loading user posters",
      posters: [],
    };
  }
}

export async function updatePoster(
  posterId: string,
  updatedDetails: PosterType
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  try {
    const { title, description, fonts, tools, tags } = updatedDetails;

    if (!title || !fonts || !tools || !tags) {
      return { success: false, error: "Missing required fields" };
    }

    const existingPoster = await prisma.poster.findUnique({
      where: { id: posterId },
      include: {
        posterCategories: {
          include: { category: true },
        },
      },
    });

    if (!existingPoster) {
      return { success: false, error: "Poster not found" };
    }

    // Původní názvy tagů
    const existingTags = existingPoster.posterCategories
      .map((pc) => pc.category.name)
      .sort();
    const newTags = [...tags].sort();

    // Pokud se tagy změnily, smažeme staré vazby
    const tagsChanged =
      JSON.stringify(existingTags) !== JSON.stringify(newTags);

    if (tagsChanged) {
      await prisma.posterCategory.deleteMany({
        where: {
          posterId: posterId,
        },
      });
    }

    // Upsert kategorií (vždy, protože je potřebujeme i pro categoryIds)
    const categories = await Promise.all(
      tags.map(async (tag: string) => {
        return prisma.category.upsert({
          where: { name: tag },
          update: {},
          create: { name: tag },
        });
      })
    );

    const updatedPoster = await prisma.poster.update({
      where: {
        id: posterId,
        userId: session?.user.id as string,
      },
      data: {
        title,
        description,
        fonts,
        tools,
        categoryIds: categories.map((c) => c.id),
        posterCategories: tagsChanged
          ? {
              create: categories.map((category) => ({
                category: { connect: { id: category.id } },
              })),
            }
          : undefined,
      },
      include: {
        posterCategories: true,
      },
    });

    revalidatePath("/");
    return { success: true, data: updatedPoster };
  } catch (error) {
    console.error("Could not update poster:", error);
    return { success: false, error: "Failed to update poster" };
  }
}
