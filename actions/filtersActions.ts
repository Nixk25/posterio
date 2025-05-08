"use server";
import prisma from "@/lib/prisma";
export const getFilterOptions = async () => {
  const categories = await prisma.category.findMany();
  const posters = await prisma.poster.findMany({
    select: { colors: true, fonts: true, tools: true },
  });

  const allColors = [...new Set(posters.flatMap((p) => p.colors))];
  const allFonts = [...new Set(posters.flatMap((p) => p.fonts))];
  const allTools = [...new Set(posters.flatMap((p) => p.tools))];

  return {
    categories: categories.map((c) => ({ label: c.name, value: c.id })),
    colors: allColors.map((c) => ({ label: c, value: c, color: true })),
    fonts: allFonts.map((f) => ({ label: f, value: f })),
    tools: allTools.map((t) => ({ label: t, value: t })),
  };
};

type FilterInput = {
  categories?: string[];
  colors?: string[];
  fonts?: string[];
  tools?: string[];
};

export const filterPosters = async (filters: FilterInput) => {
  const { categories, colors, fonts, tools } = filters;

  const posters = await prisma.poster.findMany({
    where: {
      AND: [
        categories && categories.length > 0
          ? { categoryIds: { hasSome: categories } }
          : {},
        colors && colors.length > 0 ? { colors: { hasSome: colors } } : {},
        fonts && fonts.length > 0 ? { fonts: { hasSome: fonts } } : {},
        tools && tools.length > 0 ? { tools: { hasSome: tools } } : {},
      ],
    },
    include: {
      posterCategories: {
        include: {
          category: true,
        },
      },
    },
  });

  return posters;
};
